import { ReactNode } from "react";

interface DashHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function DashHeader({ eyebrow, title, description, actions }: DashHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-fg-tertiary">{eyebrow}</p>}
        <h1 className="font-display text-2xl font-semibold tracking-tight text-fg-primary sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-fg-secondary max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}
