"use client";

import { motion } from "framer-motion";

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="space-y-3">
        <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse" />
        <div className="h-3 w-full bg-slate-800 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-slate-800 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="aspect-square bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-4 bg-slate-800 rounded animate-pulse" />
          <div className="h-3 w-3/4 bg-slate-800 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse" />
          <div className="mt-3 h-8 w-3/4 bg-slate-800 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
