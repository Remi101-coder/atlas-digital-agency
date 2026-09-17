import { createServerSupabaseClient } from "@/lib/supabase/server";

import type { BlogPostRecord } from "@/lib/blog";

export async function getBlogCategories() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getPublishedBlogPosts() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, profiles(full_name), blog_categories(name, slug)")
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as BlogPostRecord[];
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, profiles(full_name), blog_categories(name, slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as BlogPostRecord | null;
}

export async function getRelatedBlogPosts(post: BlogPostRecord, limit = 2) {
  const posts = await getPublishedBlogPosts();
  const others = posts.filter((p) => p.id !== post.id);
  const sameCategory = others.filter((p) => p.category_id && p.category_id === post.category_id);
  const rest = others.filter((p) => !sameCategory.includes(p));
  return [...sameCategory, ...rest].slice(0, limit);
}

export async function getBlogPostForAdmin(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, profiles(full_name), blog_categories(name, slug)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as BlogPostRecord | null;
}

export async function getAdminBlogPosts() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, profiles(full_name), blog_categories(name, slug)")
    .order("updated_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as BlogPostRecord[];
}

export async function getUniqueSlug(title: string, excludeId?: string) {
  const base = title.trim() || "untitled-post";
  const normalized = base
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "untitled-post";

  const supabase = await createServerSupabaseClient();

  let candidate = normalized;
  let counter = 1;

  while (true) {
    let query = supabase.from("blog_posts").select("id").eq("slug", candidate);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return candidate;
    }

    candidate = `${normalized}-${counter}`;
    counter += 1;
  }
}
