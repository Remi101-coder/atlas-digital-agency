import Link from "next/link";
import { FileText, Image as ImageIcon, Plus } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getDashboardStats, getRecentContent } from "@/lib/admin-dashboard";
import { formatDate } from "@/lib/portfolio";

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  const stats = await getDashboardStats();
  const recentContent = await getRecentContent(5);

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Welcome back</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{profile?.full_name || "Admin"}</h2>
        <p className="mt-2 text-sm text-slate-400">Role: {profile?.role || "editor"}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Published Blog</p>
          <p className="mt-3 text-3xl font-bold text-white">{stats.publishedBlogCount}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Draft Blog</p>
          <p className="mt-3 text-3xl font-bold text-amber-400">{stats.draftBlogCount}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Published Projects</p>
          <p className="mt-3 text-3xl font-bold text-emerald-400">{stats.publishedPortfolioCount}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Draft Projects</p>
          <p className="mt-3 text-3xl font-bold text-rose-400">{stats.draftPortfolioCount}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link
            href="/admin/blog/new"
            className="rounded-lg border border-slate-800 hover:border-cyan-500/40 bg-slate-900 hover:bg-slate-800 p-4 transition flex items-center gap-3"
          >
            <FileText className="h-5 w-5 text-cyan-400" />
            <div>
              <p className="font-medium text-white">New Blog Post</p>
              <p className="text-xs text-slate-400">Create and publish content</p>
            </div>
            <Plus className="h-4 w-4 text-slate-500 ml-auto" />
          </Link>
          <Link
            href="/admin/portfolio/new"
            className="rounded-lg border border-slate-800 hover:border-cyan-500/40 bg-slate-900 hover:bg-slate-800 p-4 transition flex items-center gap-3"
          >
            <ImageIcon className="h-5 w-5 text-cyan-400" />
            <div>
              <p className="font-medium text-white">New Project</p>
              <p className="text-xs text-slate-400">Add portfolio case study</p>
            </div>
            <Plus className="h-4 w-4 text-slate-500 ml-auto" />
          </Link>
        </div>
      </div>

      {/* Recent Content */}
      {recentContent.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Recently Updated</h3>
          <div className="space-y-2">
            {recentContent.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.type === "blog" ? `/admin/blog/${item.id}` : `/admin/portfolio/${item.id}`}
                className="rounded-lg border border-slate-800 hover:border-cyan-500/40 bg-slate-900 hover:bg-slate-800 p-4 transition flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-xs text-slate-400">
                    {item.type === "blog" ? "Blog" : "Portfolio"} • {item.status} • {formatDate(item.updated_at)}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    item.status === "published"
                      ? "bg-emerald-500/20 text-emerald-200"
                      : item.status === "draft"
                        ? "bg-amber-500/20 text-amber-200"
                        : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {item.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Session Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Session Status</p>
          <p className="mt-2 text-lg font-semibold text-emerald-400">Active</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Access Level</p>
          <p className="mt-2 text-lg font-semibold text-cyan-400">
            {profile?.role === "admin" ? "Full Admin" : "Editor"}
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Email</p>
          <p className="mt-2 text-lg font-semibold text-slate-200">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
