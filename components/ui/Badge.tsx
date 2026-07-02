import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors",
  {
    variants: {
      variant: {
        neutral: "bg-surface-sunken text-fg-secondary ring-[var(--border-default)]",
        brand: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] ring-[var(--color-brand-200)]",
        gold: "bg-[var(--color-gold-50)] text-[var(--color-gold-800)] ring-[var(--color-gold-200)]",
        clinical: "bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)] ring-[var(--color-clinical-200)]",
        success: "bg-[oklch(0.96_0.05_155)] text-[oklch(0.36_0.13_155)] ring-[oklch(0.86_0.10_155)]",
        warning: "bg-[oklch(0.97_0.05_75)] text-[oklch(0.42_0.13_75)] ring-[oklch(0.86_0.10_75)]",
        danger:  "bg-[oklch(0.96_0.04_25)] text-[oklch(0.42_0.16_25)] ring-[oklch(0.86_0.10_25)]",
        info:    "bg-[oklch(0.96_0.04_230)] text-[oklch(0.36_0.14_230)] ring-[oklch(0.86_0.08_230)]",
        solid:   "bg-[var(--color-brand-700)] text-white ring-transparent",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge = ({ className, variant, size, dot, children, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
    {children}
  </span>
);
