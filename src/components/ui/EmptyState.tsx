"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionText,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-12 text-center">
      {icon && <div className="mb-4 flex justify-center text-slate-500">{icon}</div>}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-400">{description}</p>}
      {(actionText && actionHref) || onAction ? (
        actionHref ? (
          <Link
            href={actionHref}
            className="mt-4 inline-block rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 font-medium transition"
          >
            {actionText}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="mt-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 font-medium transition"
          >
            {actionText}
          </button>
        )
      ) : null}
    </div>
  );
}
