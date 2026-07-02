"use client";

import Link from "next/link";
import { Award, CalendarDays, ClipboardCheck, HeartPulse, Hospital, Stethoscope, Users } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuthStore, useClinicalStore } from "@/stores";
import { getGreeting } from "@/lib/utils";

export function ClinicalHome() {
  const user = useAuthStore((s) => s.user)!;
  const entries = useClinicalStore((s) => s.entries);
  const pending = entries.filter((e) => e.status === "pending");
  const rotations = useClinicalStore((s) => s.rotations);
  const myWardRotations = rotations.slice(0, 4);

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow={getGreeting()}
        title={<>Good shift, <span className="gradient-text-brand">{user.name.split(" ").pop()}</span>.</>}
        description="Today's ward roster, pending logbook approvals and rotation evaluations — all in one view."
        actions={
          <Button asChild><Link href="/dashboard/clinical/logbook-review"><ClipboardCheck className="h-4 w-4" />Review logbooks ({pending.length})</Link></Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Students assigned" value={String(myWardRotations.length * 6)} icon={Users} accent="clinical" />
        <StatTile label="Pending sign-offs" value={String(pending.length)} icon={ClipboardCheck} accent="gold" delta={{ value: 12, positive: false, label: "vs yesterday" }} />
        <StatTile label="Active rotations" value={String(myWardRotations.length)} icon={Hospital} accent="brand" />
        <StatTile label="Avg. competency" value="82%" icon={Award} accent="clinical" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Active rotations</CardTitle>
            <CardDescription>Students currently under your supervision</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {myWardRotations.map((r) => (
              <div key={r.id} className="flex items-center gap-4 rounded-xl border border-subtle bg-surface-sunken/40 p-4">
                <Avatar name={r.studentName} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-fg-primary">{r.studentName}</div>
                  <div className="text-xs text-fg-tertiary">{r.matricule} · {r.ward} · {r.shift} shift</div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 w-28 rounded-full bg-surface-sunken overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[var(--color-clinical-500)] to-[var(--color-clinical-700)]" style={{ width: `${Math.min(100, (r.hoursCompleted / r.hoursRequired) * 100)}%` }} />
                    </div>
                    <span className="text-[11px] font-mono text-fg-tertiary">{r.hoursCompleted}/{r.hoursRequired}h</span>
                  </div>
                </div>
                <Badge variant={r.status === "evaluated" ? "success" : r.status === "completed" ? "brand" : r.status === "in_progress" ? "clinical" : "neutral"} size="sm">
                  {r.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending logbook entries</CardTitle>
            <CardDescription>Awaiting your sign-off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pending.slice(0, 5).map((e) => (
              <div key={e.id} className="rounded-lg border border-subtle p-3">
                <div className="flex items-start gap-2">
                  <Stethoscope className="mt-0.5 h-4 w-4 text-[var(--color-clinical-700)] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-fg-primary">{e.procedure}</div>
                    <div className="text-xs text-fg-tertiary">{e.studentName} · {e.ward}</div>
                  </div>
                </div>
              </div>
            ))}
            <Button asChild variant="ghost" size="sm" className="w-full"><Link href="/dashboard/clinical/logbook-review">Open review queue →</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
