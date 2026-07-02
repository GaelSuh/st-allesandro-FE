import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-default bg-surface-sunken/40 px-6 py-14 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-50)] to-[var(--color-brand-100)] text-[var(--color-brand-700)] shadow-soft">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold font-sans text-fg-primary">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-fg-secondary text-pretty">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
