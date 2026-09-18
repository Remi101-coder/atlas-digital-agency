import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AdminLayout as DashboardLayout } from "@/components/admin/AdminLayout";
import { ToastProvider } from "@/contexts/ToastContext";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  async function logout() {
    "use server";

    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return (
    <ToastProvider>
      <DashboardLayout
        title="Dashboard"
        subtitle="Supabase-backed admin workspace"
        onLogout={logout}
      >
        {children}
      </DashboardLayout>
    </ToastProvider>
  );
}
