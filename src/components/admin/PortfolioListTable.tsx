"use client";

import { MoreVertical, Plus, Eye, EyeOff, Archive } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { formatDate } from "@/lib/portfolio";
import type { PortfolioProject } from "@/lib/portfolio-server";
import { updateProjectStatusAction } from "@/lib/portfolio-actions";

interface PortfolioListTableProps {
  projects: PortfolioProject[];
  onStatusChange?: () => void;
}

export function PortfolioListTable({ projects, onStatusChange }: PortfolioListTableProps) {
  const router = useRouter();
  const [statusChanging, setStatusChanging] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setStatusChanging(id);
      await updateProjectStatusAction(id, newStatus);
      router.refresh();
      onStatusChange?.();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setStatusChanging(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-500/10 text-emerald-300";
      case "draft":
        return "bg-amber-500/10 text-amber-300";
      case "archived":
        return "bg-slate-500/10 text-slate-300";
      default:
        return "bg-slate-500/10 text-slate-300";
    }
  };

  return (
    <div className="space-y-4">
      <Link
        href="/admin/portfolio/new"
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        <Plus size={20} />
        New Project
      </Link>

      <div className="overflow-x-auto rounded-xl border border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-900">
              <th className="px-6 py-3 text-left font-semibold text-slate-300">Title</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-300">Client</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-300">Industry</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-300">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-300">Created</th>
              <th className="px-6 py-3 text-left font-semibold text-slate-300">Updated</th>
              <th className="px-6 py-3 text-right font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-slate-700 hover:bg-slate-900/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/portfolio/${project.id}`}
                    className="font-medium text-blue-400 hover:text-blue-300"
                  >
                    {project.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-slate-400">{project.client || "—"}</td>
                <td className="px-6 py-4 text-slate-400">{project.industry || "—"}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400">{formatDate(project.created_at)}</td>
                <td className="px-6 py-4 text-slate-400">{formatDate(project.updated_at)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {project.status === "draft" ? (
                      <button
                        onClick={() => handleStatusChange(project.id, "published")}
                        disabled={statusChanging === project.id}
                        className="rounded-lg bg-emerald-600/20 p-2 text-emerald-400 hover:bg-emerald-600/30 disabled:opacity-50"
                        title="Publish"
                      >
                        <Eye size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(project.id, "draft")}
                        disabled={statusChanging === project.id}
                        className="rounded-lg bg-amber-600/20 p-2 text-amber-400 hover:bg-amber-600/30 disabled:opacity-50"
                        title="Unpublish"
                      >
                        <EyeOff size={16} />
                      </button>
                    )}

                    {project.status !== "archived" && (
                      <button
                        onClick={() => handleStatusChange(project.id, "archived")}
                        disabled={statusChanging === project.id}
                        className="rounded-lg bg-slate-600/20 p-2 text-slate-400 hover:bg-slate-600/30 disabled:opacity-50"
                        title="Archive"
                      >
                        <Archive size={16} />
                      </button>
                    )}

                    <div className="relative group">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-700">
                        <MoreVertical size={16} />
                      </button>

                      <div className="absolute right-0 top-full hidden group-hover:block z-10 rounded-lg border border-slate-700 bg-slate-800 shadow-lg">
                        <Link
                          href={`/admin/portfolio/${project.id}`}
                          className="block w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700 first:rounded-t-lg"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(project.id)}
                          className="w-full px-4 py-2 text-left text-sm text-rose-400 hover:bg-slate-700 last:rounded-b-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <div className="rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-12 text-center">
          <p className="text-slate-400">No portfolio projects yet. Create one to get started.</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-white">Delete Project?</h3>
            <p className="mb-6 text-slate-300">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 rounded-lg bg-rose-600 px-4 py-2 font-medium text-white hover:bg-rose-700"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-lg border border-slate-700 px-4 py-2 font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
