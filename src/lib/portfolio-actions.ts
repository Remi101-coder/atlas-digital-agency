"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getUniquePortfolioSlug } from "@/lib/portfolio-server";
import { slugifyPortfolio } from "@/lib/portfolio";

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

export async function createPortfolioProjectAction(formData: FormData) {
  const { supabase } = await requireEditorSession();

  const title = String(formData.get("title") || "").trim();
  const client = String(formData.get("client") || "").trim();
  const industry = String(formData.get("industry") || "").trim();
  const shortDescription = String(formData.get("short_description") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const challenge = String(formData.get("challenge") || "").trim();
  const solution = String(formData.get("solution") || "").trim();
  const results = String(formData.get("results") || "").trim();
  const servicesStr = String(formData.get("services") || "");
  const services = servicesStr
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const featuredImageUrl = String(formData.get("featured_image_url") || "").trim();
  const galleryStr = String(formData.get("gallery") || "");
  const gallery = galleryStr ? JSON.parse(galleryStr) : [];
  const status = String(formData.get("status") || "draft");
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = rawSlug || slugifyPortfolio(title) || "untitled-project";
  const uniqueSlug = await getUniquePortfolioSlug(slug);

  const payload: Record<string, unknown> = {
    title,
    slug: uniqueSlug,
    client: client || null,
    industry: industry || null,
    short_description: shortDescription || null,
    description: description || null,
    challenge: challenge || null,
    solution: solution || null,
    results: results || null,
    services,
    featured_image_url: featuredImageUrl || null,
    gallery,
    status,
  };

  const { data, error } = await supabase
    .from("portfolio_projects")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/work");
  revalidatePath("/portfolio");
  redirect(`/admin/portfolio/${data.id}`);
}

export async function updatePortfolioProjectAction(id: string, formData: FormData) {
  const { supabase } = await requireEditorSession();

  const title = String(formData.get("title") || "").trim();
  const client = String(formData.get("client") || "").trim();
  const industry = String(formData.get("industry") || "").trim();
  const shortDescription = String(formData.get("short_description") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const challenge = String(formData.get("challenge") || "").trim();
  const solution = String(formData.get("solution") || "").trim();
  const results = String(formData.get("results") || "").trim();
  const servicesStr = String(formData.get("services") || "");
  const services = servicesStr
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const featuredImageUrl = String(formData.get("featured_image_url") || "").trim();
  const galleryStr = String(formData.get("gallery") || "");
  const gallery = galleryStr ? JSON.parse(galleryStr) : [];
  const status = String(formData.get("status") || "draft");
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = rawSlug || slugifyPortfolio(title) || "untitled-project";
  const uniqueSlug = await getUniquePortfolioSlug(slug, id);

  const payload: Record<string, unknown> = {
    title,
    slug: uniqueSlug,
    client: client || null,
    industry: industry || null,
    short_description: shortDescription || null,
    description: description || null,
    challenge: challenge || null,
    solution: solution || null,
    results: results || null,
    services,
    featured_image_url: featuredImageUrl || null,
    gallery,
    status,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("portfolio_projects")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/work");
  revalidatePath("/portfolio");
  revalidatePath(`/work/${slug}`);
  revalidatePath(`/portfolio/${slug}`);
  redirect(`/admin/portfolio/${id}`);
}

export async function deletePortfolioProjectAction(id: string) {
  const { supabase } = await requireEditorSession();

  // Get the project first to get the slug for revalidation
  const { data: project } = await supabase
    .from("portfolio_projects")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/work");
  revalidatePath("/portfolio");
  if (project?.slug) {
    revalidatePath(`/work/${project.slug}`);
    revalidatePath(`/portfolio/${project.slug}`);
  }

  redirect("/admin/portfolio");
}

export async function updateProjectStatusAction(id: string, status: string) {
  const { supabase } = await requireEditorSession();

  const { data: project, error: fetchError } = await supabase
    .from("portfolio_projects")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !project) {
    throw new Error("Project not found");
  }

  const updatePayload: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("portfolio_projects")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/work");
  revalidatePath("/portfolio");
  revalidatePath(`/work/${project.slug}`);
  revalidatePath(`/portfolio/${project.slug}`);
}
