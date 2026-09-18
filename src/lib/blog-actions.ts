"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUniqueSlug } from "@/lib/blog-server";
import { slugify } from "@/lib/blog";

export async function requireEditorSession() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !["admin", "editor"].includes(profile.role ?? "")) {
    redirect("/admin/login");
  }

  return { supabase, user, profile };
}

export async function createBlogPostAction(formData: FormData) {
  const { supabase, user } = await requireEditorSession();

  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "");
  const categoryId = String(formData.get("category_id") || "").trim();
  const status = String(formData.get("status") || "draft");
  const publishedAt = String(formData.get("published_at") || "").trim();
  const featureImageUrl = String(formData.get("featured_image_url") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = rawSlug || slugify(title) || "untitled-post";
  const uniqueSlug = await getUniqueSlug(slug);

  const payload: Record<string, unknown> = {
    title,
    slug: uniqueSlug,
    excerpt: excerpt || null,
    content,
    featured_image_url: featureImageUrl || null,
    author_id: user.id,
    category_id: categoryId || null,
    status,
    published_at: status === "published" ? (publishedAt || new Date().toISOString()) : null,
  };

  const { error } = await supabase.from("blog_posts").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPostAction(id: string, formData: FormData) {
  const { supabase } = await requireEditorSession();

  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "");
  const categoryId = String(formData.get("category_id") || "").trim();
  const status = String(formData.get("status") || "draft");
  const publishedAt = String(formData.get("published_at") || "").trim();
  const featureImageUrl = String(formData.get("featured_image_url") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = rawSlug || slugify(title) || "untitled-post";
  const uniqueSlug = await getUniqueSlug(slug, id);

  const payload: Record<string, unknown> = {
    title,
    slug: uniqueSlug,
    excerpt: excerpt || null,
    content,
    featured_image_url: featureImageUrl || null,
    category_id: categoryId || null,
    status,
    published_at: status === "published" ? (publishedAt || new Date().toISOString()) : null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/[id]");
  revalidatePath("/blog");
  redirect(`/admin/blog/${id}`);
}

export async function deleteBlogPostAction(id: string) {
  const { supabase } = await requireEditorSession();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updateBlogStatusAction(id: string, status: "draft" | "published" | "archived") {
  const { supabase } = await requireEditorSession();

  const payload: Record<string, unknown> = {
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
