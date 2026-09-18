import { redirect } from "next/navigation";

import { PortfolioProjectForm } from "@/components/admin/PortfolioProjectForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata = {
  title: "New Portfolio Project | Admin",
};

export default async function AdminNewPortfolioPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Create Portfolio Project</h1>
        <p className="mt-2 text-slate-400">Add a new case study or portfolio project</p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
        <PortfolioProjectForm mode="create" />
      </div>
    </div>
  );
}
