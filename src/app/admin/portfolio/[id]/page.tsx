import { redirect } from "next/navigation";

import { PortfolioProjectForm } from "@/components/admin/PortfolioProjectForm";
import { getPortfolioProjectForAdmin } from "@/lib/portfolio-server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Edit Portfolio Project | Admin",
};

export default async function AdminPortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const project = await getPortfolioProjectForAdmin(id);

  if (!project) {
    redirect("/admin/portfolio");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Portfolio Project</h1>
        <p className="mt-2 text-slate-400">Update case study details and media</p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
        <PortfolioProjectForm
          mode="edit"
          initialValues={{
            id: project.id,
            title: project.title,
            slug: project.slug,
            client: project.client || "",
            industry: project.industry || "",
            short_description: project.short_description || "",
            description: project.description || "",
            challenge: project.challenge || "",
            solution: project.solution || "",
            results: project.results || "",
            services: project.services || [],
            featured_image_url: project.featured_image_url || "",
            gallery: project.gallery || [],
            status: project.status,
          }}
        />
      </div>
    </div>
  );
}
