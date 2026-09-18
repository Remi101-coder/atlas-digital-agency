import { redirect } from "next/navigation";
import Link from "next/link";

import { getAdminPortfolioProjects } from "@/lib/portfolio-server";
import { PortfolioListTable } from "@/components/admin/PortfolioListTable";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Portfolio | Admin",
};

export default async function AdminPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const status = params.status || "all";
  const searchQuery = params.search || undefined;

  const projects = await getAdminPortfolioProjects(
    status === "all" ? undefined : status,
    searchQuery
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Portfolio Projects</h1>
        <p className="mt-2 text-slate-400">Manage your case studies and portfolio projects</p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/portfolio?status=all"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            status === "all"
              ? "bg-blue-600 text-white"
              : "border border-slate-700 text-slate-300 hover:bg-slate-900"
          }`}
        >
          All ({projects.length})
        </Link>
        <Link
          href="/admin/portfolio?status=draft"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            status === "draft"
              ? "bg-amber-600 text-white"
              : "border border-slate-700 text-slate-300 hover:bg-slate-900"
          }`}
        >
          Draft ({projects.filter((p) => p.status === "draft").length})
        </Link>
        <Link
          href="/admin/portfolio?status=published"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            status === "published"
              ? "bg-emerald-600 text-white"
              : "border border-slate-700 text-slate-300 hover:bg-slate-900"
          }`}
        >
          Published ({projects.filter((p) => p.status === "published").length})
        </Link>
        <Link
          href="/admin/portfolio?status=archived"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            status === "archived"
              ? "bg-slate-600 text-white"
              : "border border-slate-700 text-slate-300 hover:bg-slate-900"
          }`}
        >
          Archived ({projects.filter((p) => p.status === "archived").length})
        </Link>
      </div>

      <PortfolioListTable projects={projects} />
    </div>
  );
}
