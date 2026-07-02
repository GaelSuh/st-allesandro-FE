"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatTileProps {
  label: string;
  value: ReactNode;
  delta?: { value: number; positive?: boolean; label?: string };
  icon?: LucideIcon;
  accent?: "brand" | "gold" | "clinical" | "neutral";
  loading?: boolean;
  className?: string;
}

const accents = {
  brand: "from-[var(--color-brand-50)] to-transparent text-[var(--color-brand-700)]",
  gold: "from-[var(--color-gold-50)] to-transparent text-[var(--color-gold-700)]",
  clinical: "from-[var(--color-clinical-50)] to-transparent text-[var(--color-clinical-700)]",
  neutral: "from-surface-sunken to-transparent text-fg-secondary",
};

export function StatTile({ label, value, delta, icon: Icon, accent = "brand", loading, className }: StatTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-default bg-surface-elevated p-5 shadow-soft transition-shadow hover:shadow-elevated",
        className
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-24 bg-gradient-to-b opacity-60", accents[accent])} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-fg-tertiary font-medium">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            {loading ? (
              <div className="skeleton h-8 w-24" />
            ) : (
              <span className="font-display text-3xl font-semibold tracking-tight text-fg-primary">{value}</span>
            )}
          </div>
          {delta && !loading && (
            <p
              className={cn(
                "mt-2 inline-flex items-center gap-1 text-xs font-medium",
                delta.positive ? "text-[oklch(0.50_0.155_155)]" : "text-[oklch(0.55_0.205_25)]"
              )}
            >
              <span>{delta.positive ? "↑" : "↓"}</span>
              <span>{Math.abs(delta.value)}%</span>
              {delta.label && <span className="text-fg-tertiary">{delta.label}</span>}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn("grid h-10 w-10 place-items-center rounded-xl bg-surface ring-1 ring-[var(--border-subtle)]", accents[accent].split(" ").slice(-1)[0])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
