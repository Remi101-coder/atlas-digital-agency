import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { listStorageFiles } from "@/lib/admin-storage";
import { MediaGallery } from "@/components/admin/MediaGallery";
import { EmptyState } from "@/components/ui/EmptyState";
import { ImageIcon } from "lucide-react";

export default async function AdminMediaPage() {
  const supabase = await createServerSupabaseClient();

  // Check auth
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/admin/login");
  }

  // Check role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/admin/login");
  }

  const blogFiles = await listStorageFiles("blog-images");
  const portfolioFiles = await listStorageFiles("portfolio-images");

  const hasFiles = blogFiles.length > 0 || portfolioFiles.length > 0;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Media Management</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Upload Library</h2>
        <p className="mt-2 text-sm text-slate-400">
          Manage all uploaded images from your blog posts and portfolio projects.
        </p>
      </div>

      {hasFiles ? (
        <>
          {blogFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Blog Images</h3>
              <MediaGallery files={blogFiles} bucket="blog-images" />
            </div>
          )}

          {portfolioFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Portfolio Images</h3>
              <MediaGallery files={portfolioFiles} bucket="portfolio-images" />
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={<ImageIcon className="h-12 w-12" />}
          title="No media uploaded yet"
          description="Images you upload through blog posts and portfolio projects will appear here."
        />
      )}
    </div>
  );
}
