import Link from "next/link";
import { LayoutDashboard, FileText, Briefcase, Image as ImageIcon, Settings, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <aside className="w-full border-b border-slate-800 bg-slate-950/90 p-4 md:w-72 md:border-b-0 md:border-r md:flex md:flex-col">
      <div className="flex items-center justify-between gap-3 md:block">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Atlas</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Admin</h2>
        </div>
      </div>

      <nav className="mt-6 flex flex-col gap-2 md:mt-8 md:flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-500/40 hover:bg-slate-900 hover:text-white flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-4 md:mt-0 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-left text-sm font-medium text-rose-200 transition hover:bg-rose-500/20 flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}
