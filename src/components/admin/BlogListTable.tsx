"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { formatDate } from "@/lib/blog";

export type AdminBlogRow = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  excerpt?: string | null;
  published_at?: string | null;
  updated_at?: string;
  featured_image_url?: string | null;
  blog_categories?: { name?: string | null } | null;
  profiles?: { full_name?: string | null } | null;
};

export function BlogListTable({
  initialPosts,
  categories,
}: {
  initialPosts: AdminBlogRow[];
  categories: Array<{ id: string; name: string; slug: string }>;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isBusy, setIsBusy] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.excerpt ?? "").toLowerCase().includes(search.toLowerCase()) ||
        post.slug.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" ||
        (post.blog_categories?.name ?? "") ===
          categories.find((category) => category.id === categoryFilter)?.name;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [initialPosts, search, statusFilter, categoryFilter, categories]);

  async function handleStatusChange(postId: string, nextStatus: AdminBlogRow["status"]) {
    setIsBusy(postId);

    try {
      const response = await fetch(`/api/admin/blog/${postId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        throw new Error("Status update failed.");
      }

      router.refresh();
    } catch {
      window.alert("Unable to update status.");
    } finally {
      setIsBusy(null);
    }
  }

  async function handleDelete(postId: string) {
    const confirmed = window.confirm("Delete this blog post permanently?");
    if (!confirmed) {
      return;
    }

    setIsBusy(postId);

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      router.refresh();
    } catch {
      window.alert("Unable to delete the post.");
    } finally {
      setIsBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white md:max-w-xs"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white"
            >
              <option value="all">All statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/admin/blog/new"
            className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950"
          >
            Add new post
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="border-b border-slate-800 bg-slate-950/80 text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    No posts match your current filters.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-slate-800 last:border-b-0">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {post.featured_image_url ? (
                          <img src={post.featured_image_url} alt={post.title} className="h-12 w-12 rounded-lg object-cover" />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-slate-800" />
                        )}
                        <div>
                          <div className="font-medium text-white">{post.title}</div>
                          <div className="text-xs text-slate-400">/{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{post.blog_categories?.name ?? "Uncategorized"}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs capitalize text-slate-200">
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">{post.profiles?.full_name ?? "Unknown"}</td>
                    <td className="px-4 py-4">{formatDate(post.published_at)}</td>
                    <td className="px-4 py-4">{formatDate(post.updated_at)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-200 hover:border-cyan-400"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          disabled={isBusy === post.id}
                          onClick={() => handleStatusChange(post.id, "published")}
                          className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-200 hover:bg-emerald-500/20"
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          disabled={isBusy === post.id}
                          onClick={() => handleStatusChange(post.id, "draft")}
                          className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-xs text-amber-200 hover:bg-amber-500/20"
                        >
                          Draft
                        </button>
                        <button
                          type="button"
                          disabled={isBusy === post.id}
                          onClick={() => handleStatusChange(post.id, "archived")}
                          className="rounded-lg border border-slate-500/40 bg-slate-700/20 px-2 py-1 text-xs text-slate-200 hover:bg-slate-700/40"
                        >
                          Archive
                        </button>
                        <button
                          type="button"
                          disabled={isBusy === post.id}
                          onClick={() => handleDelete(post.id)}
                          className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-2 py-1 text-xs text-rose-200 hover:bg-rose-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
