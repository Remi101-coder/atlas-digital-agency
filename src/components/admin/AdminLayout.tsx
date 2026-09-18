import type { ReactNode } from "react";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminLayout({
  title,
  subtitle,
  children,
  onLogout,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminSidebar onLogout={onLogout} />

        <div className="flex-1">
          <AdminHeader title={title} subtitle={subtitle} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
