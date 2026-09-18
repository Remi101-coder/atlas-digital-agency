import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { requireEditorSession } from "@/lib/blog-actions";
import { getBlogPostForAdmin } from "@/lib/blog-server";
import { getUniqueSlug } from "@/lib/blog-server";
import { slugify, type BlogPostStatus } from "@/lib/blog";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { supabase } = await requireEditorSession();
    const payload = await request.json();

    const title = String(payload.title ?? "").trim();
    const requestedSlug = String(payload.slug ?? "").trim();
    const excerpt = String(payload.excerpt ?? "").trim();
    const content = String(payload.content ?? "");
    const categoryId = String(payload.category_id ?? "").trim();
    const status = String(payload.status ?? "draft") as BlogPostStatus;
    const featuredImageUrl = payload.featured_image_url ? String(payload.featured_image_url) : null;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
    }

    if (!["draft", "published", "archived"].includes(status)) {
      return NextResponse.json({ error: "Invalid blog post status." }, { status: 400 });
    }

    const { data: existingPost, error: existingPostError } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("id", id)
      .maybeSingle();

    if (existingPostError) {
      return NextResponse.json({ error: existingPostError.message }, { status: 400 });
    }

    const slug = await getUniqueSlug(slugify(requestedSlug || title) || "untitled-post", id);
    const effectivePublishedAt = status === "published" ? new Date().toISOString() : null;

    const { error } = await supabase.from("blog_posts").update({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featured_image_url: featuredImageUrl,
      category_id: categoryId || null,
      status,
      published_at: effectivePublishedAt,
      updated_at: new Date().toISOString(),
    }).eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    if (existingPost?.slug && existingPost.slug !== slug) {
      revalidatePath(`/blog/${existingPost.slug}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update blog post." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { supabase } = await requireEditorSession();

    const existingPost = await getBlogPostForAdmin(id);
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

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
      { error: error instanceof Error ? error.message : "Unable to delete blog post." },
      { status: 500 },
    );
  }
}
