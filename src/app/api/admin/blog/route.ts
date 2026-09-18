import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { requireEditorSession } from "@/lib/blog-actions";
import { getUniqueSlug } from "@/lib/blog-server";
import { slugify, type BlogPostStatus } from "@/lib/blog";

export async function POST(request: Request) {
  try {
    const { supabase, user } = await requireEditorSession();
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

    const slug = await getUniqueSlug(slugify(requestedSlug || title) || "untitled-post");
    const effectivePublishedAt = status === "published" ? new Date().toISOString() : null;

    const { data, error } = await supabase.from("blog_posts").insert({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featured_image_url: featuredImageUrl,
      author_id: user.id,
      category_id: categoryId || null,
      status,
      published_at: effectivePublishedAt,
    }).select("id, slug, status, published_at").single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create blog post." },
      { status: 500 },
    );
  }
}
