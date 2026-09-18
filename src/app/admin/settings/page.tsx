import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminSettingsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Settings</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Admin Settings</h2>
        <p className="mt-2 text-sm text-slate-400">Manage your profile and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Profile</h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Full Name</p>
              <p className="mt-2 text-white font-medium">{profile?.full_name || "Not set"}</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-2 text-white font-medium">{user.email}</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Role</p>
              <p className="mt-2 text-white font-medium capitalize">{profile?.role || "Editor"}</p>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">System</h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm text-slate-400">CMS Version</p>
              <p className="mt-2 text-white font-medium">1.0.0</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Database</p>
              <p className="mt-2 text-white font-medium">Supabase PostgreSQL</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Storage</p>
              <p className="mt-2 text-white font-medium">Supabase Storage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
        <p className="text-sm text-blue-200">
          💡 Profile editing and advanced settings are coming soon. Contact your administrator for account changes.
        </p>
      </div>
    </div>
  );
}
