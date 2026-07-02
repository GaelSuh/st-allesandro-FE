"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useAuthStore, useUIStore } from "@/stores";
import { getNavForRole, ROLE_LABEL } from "./nav-config";

export function Sidebar({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const collapsed = useUIStore((s) => s.sidebarCollapsed) && !mobile;
  const toggleCollapse = useUIStore((s) => s.toggleCollapse);

  if (!user) return null;
  const groups = getNavForRole(user.role);

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-surface-elevated border-r border-default",
        collapsed ? "w-[72px]" : "w-72"
      )}
    >
      <div className={cn("flex items-center border-b border-subtle px-4 py-4", collapsed ? "justify-center" : "justify-between")}>
        {collapsed ? <Logo variant="mark" /> : <Logo />}
        {!mobile && (
          <button
            onClick={toggleCollapse}
            className={cn(
              "grid h-7 w-7 place-items-center rounded-md text-fg-tertiary hover:bg-surface-sunken hover:text-fg-primary focus-ring",
              collapsed && "absolute right-2 top-4"
            )}
            aria-label="Collapse sidebar"
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {groups.map((group, gi) => (
          <div key={gi} className={cn(gi > 0 && "mt-5")}>
            {!collapsed && (
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-tertiary">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        active
                          ? "bg-[var(--color-brand-50)] text-[var(--color-brand-800)]"
                          : "text-fg-secondary hover:bg-surface-sunken hover:text-fg-primary"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {active && (
                        <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-[var(--color-brand-700)]" />
                      )}
                      <item.Icon className={cn("h-4 w-4 shrink-0", active && "text-[var(--color-brand-700)]")} />
                      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                      {!collapsed && typeof item.badge === "number" && item.badge > 0 && (
                        <Badge size="sm" variant={active ? "brand" : "neutral"}>{item.badge}</Badge>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-subtle p-3">
        <div className={cn("flex items-center gap-3 rounded-xl p-2 bg-surface-sunken/40", collapsed && "flex-col gap-2 p-1.5")}>
          <Avatar src={user.avatar} name={user.name} size="sm" />
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-fg-primary">{user.name}</div>
                <div className="truncate text-[11px] text-fg-tertiary">{ROLE_LABEL[user.role]}</div>
              </div>
              <button
                onClick={logout}
                className="grid h-7 w-7 place-items-center rounded-md text-fg-tertiary hover:bg-surface hover:text-[oklch(0.55_0.205_25)] focus-ring"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
