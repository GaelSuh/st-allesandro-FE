"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores";
import { getNavForRole } from "./nav-config";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  if (!user) return null;
  // Pick first 4 most-important nav items + dashboard
  const groups = getNavForRole(user.role);
  const flat = groups.flatMap((g) => g.items);
  const items = [
    flat.find((i) => i.href === "/dashboard")!,
    ...flat.filter((i) => i.href !== "/dashboard").slice(0, 3),
  ].filter(Boolean).slice(0, 4);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-default bg-surface-elevated/95 backdrop-blur supports-[backdrop-filter]:bg-surface-elevated/85 lg:hidden">
      <ul className="grid grid-cols-4">
        {items.map((it) => {
          const active = pathname === it.href || (it.href !== "/dashboard" && pathname?.startsWith(it.href));
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium",
                  active ? "text-[var(--color-brand-700)]" : "text-fg-tertiary"
                )}
              >
                <it.Icon className="h-5 w-5" />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
