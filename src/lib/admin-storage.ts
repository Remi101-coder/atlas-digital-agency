import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface StorageFile {
  name: string;
  bucket: string;
  url: string;
  size: number;
  created_at: string;
  path: string;
}

export async function listStorageFiles(bucket: "blog-images" | "portfolio-images"): Promise<StorageFile[]> {
  const supabase = await createServerSupabaseClient();

  try {
    const prefixes =
      bucket === "blog-images"
        ? ["", "posts", "posts/featured"]
        : ["", "featured", "gallery"];

    const fileMap = new Map<string, StorageFile>();

    for (const prefix of prefixes) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(prefix, {
          limit: 1000,
          offset: 0,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (error) throw error;

      for (const file of data || []) {
        if (!file.name || file.name.startsWith(".")) continue;

        const filePath = prefix ? `${prefix}/${file.name}` : file.name;

        if (!file.metadata || typeof file.metadata.size !== "number") {
          continue;
        }

        const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(filePath);

        fileMap.set(filePath, {
          name: file.name,
          bucket,
          url: publicData.publicUrl,
          size: file.metadata.size,
          created_at: file.created_at || new Date().toISOString(),
          path: filePath,
        });
      }
    }

    return Array.from(fileMap.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  } catch (error) {
    console.error(`Failed to list files from ${bucket}:`, error);
    return [];
  }
}

export async function deleteStorageFile(bucket: "blog-images" | "portfolio-images", path: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();

  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Failed to delete file from ${bucket}:`, error);
    return false;
  }
}
