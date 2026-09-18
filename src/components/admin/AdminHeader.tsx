export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/70 px-6 py-5 backdrop-blur-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Atlas Admin</p>
          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        </div>

        {subtitle ? <p className="text-sm text-slate-400">{subtitle}</p> : null}
      </div>
    </header>
  );
}
