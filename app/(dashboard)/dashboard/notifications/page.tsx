"use client";

import { Bell, Check, Trash2 } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useNotificationStore } from "@/stores";
import { relativeTime, cn } from "@/lib/utils";

export default function NotificationsPage() {
  const items = useNotificationStore((s) => s.items);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const remove = useNotificationStore((s) => s.remove);
  const markRead = useNotificationStore((s) => s.markRead);
  const unread = items.filter((i) => !i.read).length;

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Inbox"
        title="Notifications"
        description={unread === 0 ? "You're all caught up." : `${unread} unread notification${unread === 1 ? "" : "s"}.`}
        actions={
          unread > 0 ? <Button onClick={markAllRead} variant="secondary" leftIcon={<Check className="h-4 w-4" />}>Mark all read</Button> : null
        }
      />

      {items.length === 0 ? (
        <EmptyState icon={<Bell className="h-6 w-6" />} title="No notifications" description="When you have alerts, they'll show up here." />
      ) : (
        <Card>
          <CardContent className="p-2 divide-y divide-[var(--border-subtle)]">
            {items.map((n) => (
              <div key={n.id} className={cn("group flex items-start gap-3 p-3", !n.read && "bg-[var(--color-brand-50)]/40 rounded-lg")}>
                <span className={cn(
                  "mt-1 h-2 w-2 shrink-0 rounded-full",
                  n.type === "academic" && "bg-[var(--color-brand-600)]",
                  n.type === "finance" && "bg-[var(--color-gold-600)]",
                  n.type === "clinical" && "bg-[var(--color-clinical-600)]",
                  n.type === "warning" && "bg-[oklch(0.78_0.155_75)]",
                  n.type === "danger" && "bg-[oklch(0.58_0.205_25)]",
                  n.type === "success" && "bg-[oklch(0.62_0.155_155)]",
                  (n.type === "info" || !n.type) && "bg-[oklch(0.62_0.135_230)]",
                  n.read && "opacity-30"
                )} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-fg-primary">{n.title}</p>
                    <span className="text-[11px] text-fg-tertiary whitespace-nowrap">{relativeTime(n.createdAt)}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-fg-secondary">{n.body}</p>
                  <div className="mt-2 flex items-center gap-2">
                    {n.actionLabel && (<a href={n.actionHref ?? "#"} className="text-xs font-semibold text-[var(--color-brand-700)] hover:underline">{n.actionLabel} →</a>)}
                    {!n.read && (<button onClick={() => markRead(n.id)} className="text-xs text-fg-tertiary hover:text-fg-primary">Mark read</button>)}
                  </div>
                </div>
                <button onClick={() => remove(n.id)} className="opacity-0 group-hover:opacity-100 transition-opacity grid h-7 w-7 place-items-center rounded-md text-fg-tertiary hover:text-[oklch(0.55_0.205_25)] hover:bg-surface-sunken" aria-label="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
