import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { requireEditorSession } from "@/lib/blog-actions";
import { getBlogPostForAdmin } from "@/lib/blog-server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { supabase } = await requireEditorSession();
    const existingPost = await getBlogPostForAdmin(id);
    const payload = await request.json();
    const status = String(payload.status ?? "draft");

    const { error } = await supabase.from("blog_posts").update({
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }).eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    revalidatePath("/blog");
    if (existingPost?.slug) {
      revalidatePath(`/blog/${existingPost.slug}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update status." },
      { status: 500 },
    );
  }
}
