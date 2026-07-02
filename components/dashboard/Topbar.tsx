"use client";

import Link from "next/link";
import { Bell, LogOut, Menu, Moon, Search, Sun, User } from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown";
import { useAuthStore, useNotificationStore, useUIStore } from "@/stores";
import { ROLE_LABEL } from "./nav-config";
import { cn, relativeTime } from "@/lib/utils";

export function Topbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const items = useNotificationStore((s) => s.items);
  const unread = items.filter((i) => !i.read).length;
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const openCommand = useUIStore((s) => s.openCommand);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openCommand();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openCommand]);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-2 border-b border-default bg-surface-elevated/85 backdrop-blur px-4 sm:px-6">
      <button
        onClick={toggleSidebar}
        className="grid h-9 w-9 place-items-center rounded-lg text-fg-secondary hover:bg-surface-sunken lg:hidden focus-ring"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Command/search trigger */}
      <button
        onClick={openCommand}
        className="hidden sm:flex h-9 flex-1 max-w-md items-center justify-between gap-2 rounded-lg border border-default bg-surface px-3 text-left text-sm text-fg-tertiary transition-colors hover:bg-surface-sunken"
      >
        <span className="inline-flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search anything…
        </span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-default bg-surface-muted px-1.5 text-[10px] font-medium text-fg-tertiary">
          <span className="text-[9px]">⌘</span>K
        </kbd>
      </button>

      <div className="flex flex-1 sm:flex-none items-center justify-end gap-1.5">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="grid h-9 w-9 place-items-center rounded-lg text-fg-secondary hover:bg-surface-sunken focus-ring"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative grid h-9 w-9 place-items-center rounded-lg text-fg-secondary hover:bg-surface-sunken focus-ring">
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[oklch(0.58_0.205_25)] px-1 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[360px] p-0">
            <div className="flex items-center justify-between border-b border-subtle px-4 py-3">
              <div className="font-semibold text-fg-primary">Notifications</div>
              {unread > 0 && (
                <button onClick={markAllRead} className="text-xs font-medium text-[var(--color-brand-700)] hover:underline">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-[420px] overflow-y-auto p-1">
              {items.length === 0 ? (
                <div className="p-6 text-center text-sm text-fg-tertiary">You're all caught up.</div>
              ) : (
                items.slice(0, 8).map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={cn(
                      "group flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-surface-sunken",
                      !n.read && "bg-[var(--color-brand-50)]/40"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1 h-2 w-2 shrink-0 rounded-full",
                        n.type === "academic" && "bg-[var(--color-brand-600)]",
                        n.type === "finance" && "bg-[var(--color-gold-600)]",
                        n.type === "clinical" && "bg-[var(--color-clinical-600)]",
                        n.type === "warning" && "bg-[oklch(0.78_0.155_75)]",
                        n.type === "danger" && "bg-[oklch(0.58_0.205_25)]",
                        n.type === "success" && "bg-[oklch(0.62_0.155_155)]",
                        n.type === "info" && "bg-[oklch(0.62_0.135_230)]",
                        n.read && "opacity-30"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-fg-primary">{n.title}</div>
                      <p className="mt-0.5 text-xs text-fg-secondary line-clamp-2">{n.body}</p>
                      <p className="mt-1 text-[11px] text-fg-tertiary">{relativeTime(n.createdAt)}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
            <div className="border-t border-subtle p-2">
              <Link href="/dashboard/notifications" className="block w-full rounded-lg px-3 py-2 text-center text-xs font-medium text-fg-secondary hover:bg-surface-sunken">
                View all notifications
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-surface-sunken focus-ring">
              <Avatar src={user.avatar} name={user.name} size="sm" />
              <div className="hidden text-left lg:block">
                <div className="text-xs font-semibold text-fg-primary leading-tight">{user.name}</div>
                <div className="text-[10px] text-fg-tertiary">{ROLE_LABEL[user.role]}</div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/dashboard/profile"><User className="h-4 w-4" />Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/dashboard/settings"><User className="h-4 w-4" />Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive onClick={logout}><LogOut className="h-4 w-4" />Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
