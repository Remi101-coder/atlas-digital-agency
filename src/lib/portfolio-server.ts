import { createServerSupabaseClient } from "@/lib/supabase/server";

export type PortfolioProjectStatus = "draft" | "published" | "archived";

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryImage {
  url: string;
  alt?: string;
  title?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  client?: string | null;
  industry?: string | null;
  short_description?: string | null;
  description?: string | null;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  services: string[];
  featured_image_url?: string | null;
  gallery: GalleryImage[];
  status: PortfolioProjectStatus;
  created_at?: string;
  updated_at?: string;
}

export async function getPortfolioCategories() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("portfolio_categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching portfolio categories:", error);
    return [];
  }

  return data as PortfolioCategory[];
}

export async function getPublishedPortfolioProjects() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published portfolio projects:", error);
    return [];
  }

  return data as PortfolioProject[];
}

export async function getPortfolioProjectBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Error fetching portfolio project:", error);
    return null;
  }

  return data as PortfolioProject | null;
}

export async function getPortfolioProjectForAdmin(id: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching portfolio project:", error);
    return null;
  }

  return data as PortfolioProject | null;
}

export async function getAdminPortfolioProjects(
  status?: string,
  searchQuery?: string
) {
  const supabase = await createServerSupabaseClient();

  let query = supabase.from("portfolio_projects").select("*");

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,client.ilike.%${searchQuery}%`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin portfolio projects:", error);
    return [];
  }

  return data as PortfolioProject[];
}

export async function getUniquePortfolioSlug(
  title: string,
  excludeId?: string
) {
  const supabase = await createServerSupabaseClient();

  const baseSlug = slugifyPortfolio(title);
  let slug = baseSlug;
  let counter = 1;

  let query = supabase
    .from("portfolio_projects")
    .select("slug", { count: "exact" })
    .eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  while (true) {
    const { count, error } = await query;

    if (error) {
      console.error("Error checking slug uniqueness:", error);
      break;
    }

    if (count === 0) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  return slug;
}

export function slugifyPortfolio(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
