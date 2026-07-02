"use client";

import { useRouter } from "next/navigation";
import { Search, ArrowRight, BookOpen, Hospital, GraduationCap, Wallet, ClipboardCheck, CalendarDays, Settings } from "lucide-react";
import { useUIStore, useAuthStore } from "@/stores";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { getNavForRole } from "./nav-config";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "Pay tuition", href: "/dashboard/finance", Icon: Wallet, shortcut: "P" },
  { label: "Open practical logbook", href: "/dashboard/logbook", Icon: ClipboardCheck, shortcut: "L" },
  { label: "View today's timetable", href: "/dashboard/timetable", Icon: CalendarDays, shortcut: "T" },
  { label: "Open settings", href: "/dashboard/settings", Icon: Settings, shortcut: "S" },
];

export function CommandPalette() {
  const open = useUIStore((s) => s.commandOpen);
  const setOpen = useUIStore((s) => s.setCommand);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    if (!user) return [];
    return getNavForRole(user.role).flatMap((g) => g.items.map((i) => ({ ...i, group: g.label })));
  }, [user]);

  const filtered = items.filter((i) => !q || i.label.toLowerCase().includes(q.toLowerCase()));

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent hideClose className="max-w-2xl p-0 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-subtle px-4 py-3">
          <Search className="h-4 w-4 text-fg-tertiary" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-sm text-fg-primary placeholder:text-fg-tertiary focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-default px-1.5 text-[10px] text-fg-tertiary">ESC</kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {!q && (
            <>
              <div className="px-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-fg-tertiary">Quick actions</div>
              {quickActions.map((a) => (
                <CommandRow key={a.href} Icon={a.Icon} label={a.label} shortcut={a.shortcut} onSelect={() => { setOpen(false); router.push(a.href); }} />
              ))}
              <div className="mt-3 px-2 text-[10px] font-semibold uppercase tracking-wider text-fg-tertiary">Navigation</div>
            </>
          )}
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-fg-tertiary">No results for "{q}"</div>
          ) : (
            filtered.map((i) => (
              <CommandRow
                key={i.href}
                Icon={i.Icon}
                label={i.label}
                hint={"group" in i ? (i as any).group : undefined}
                onSelect={() => { setOpen(false); router.push(i.href); }}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CommandRow({
  Icon,
  label,
  hint,
  shortcut,
  onSelect,
}: {
  Icon: any;
  label: string;
  hint?: string;
  shortcut?: string;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
        "text-fg-secondary hover:bg-surface-sunken hover:text-fg-primary"
      )}
    >
      <Icon className="h-4 w-4 text-fg-tertiary group-hover:text-fg-primary" />
      <span className="flex-1 font-medium">{label}</span>
      {hint && <span className="text-xs text-fg-tertiary">{hint}</span>}
      {shortcut ? (
        <kbd className="rounded border border-default px-1.5 py-0.5 text-[10px] text-fg-tertiary">⌘{shortcut}</kbd>
      ) : (
        <ArrowRight className="h-3.5 w-3.5 text-fg-tertiary opacity-0 group-hover:opacity-100" />
      )}
    </button>
  );
}
