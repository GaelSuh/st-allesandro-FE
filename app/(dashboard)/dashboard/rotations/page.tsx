"use client";

import { useMemo } from "react";
import { Calendar, Hospital, MapPin, Stethoscope, User } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { useClinicalStore } from "@/stores";
import { formatDate, percent } from "@/lib/utils";
import { currentStudent } from "@/data/people";

export default function StudentRotationsPage() {
  const all = useClinicalStore((s) => s.rotations);
  // Show all (since seeded for many students)
  const mine = useMemo(() => all.slice(0, 4), [all]);
  const upcoming = all.slice(4, 6);

  const completed = mine.filter((r) => r.status === "completed" || r.status === "evaluated").length;

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Clinical"
        title="My rotations"
        description="Past, current and upcoming placements with required hours and supervisor sign-off."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-fg-tertiary font-medium">Completed</p><p className="mt-2 font-display text-3xl font-semibold text-fg-primary">{completed}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-fg-tertiary font-medium">Active</p><p className="mt-2 font-display text-3xl font-semibold text-fg-primary">1</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-fg-tertiary font-medium">Total clinical hours</p><p className="mt-2 font-display text-3xl font-semibold text-fg-primary">{mine.reduce((a, r) => a + r.hoursCompleted, 0)}h</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current & past rotations</CardTitle>
          <CardDescription>Each rotation lasts 28 days · 120 hours required</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mine.map((r) => {
            const pct = percent(r.hoursCompleted, r.hoursRequired);
            return (
              <div key={r.id} className="rounded-xl border border-subtle p-5 bg-surface-sunken/30">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)]">
                      <Hospital className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-fg-primary">{r.hospitalName}</div>
                      <div className="text-xs text-fg-tertiary">Ward: {r.ward} · {r.shift} shift</div>
                      <div className="mt-1 inline-flex items-center gap-2 text-xs text-fg-secondary">
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(r.startDate)} → {formatDate(r.endDate)}</span>
                        <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{r.supervisorName}</span>
                      </div>
                    </div>
                  </div>
                  <Badge size="sm" variant={r.status === "evaluated" ? "success" : r.status === "completed" ? "brand" : r.status === "in_progress" ? "clinical" : "neutral"}>{r.status.replace("_", " ")}</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs"><span className="text-fg-tertiary">Hours logged</span><span className="font-mono font-semibold text-fg-primary">{r.hoursCompleted}/{r.hoursRequired}</span></div>
                  <Progress value={pct} className="mt-1.5" indicatorClassName="bg-gradient-to-r from-[var(--color-clinical-500)] to-[var(--color-clinical-700)]" />
                </div>
                {r.evaluation && (
                  <div className="mt-4 rounded-lg border border-subtle bg-surface p-3 text-xs">
                    <div className="flex items-center justify-between"><span className="text-fg-tertiary">Evaluation</span><span className="font-display text-lg font-semibold text-[var(--color-clinical-700)]">{r.evaluation.score}/100</span></div>
                    <p className="mt-1 text-fg-secondary">{r.evaluation.notes}</p>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Upcoming rotations</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {upcoming.map((r) => (
            <div key={r.id} className="flex items-center gap-4 rounded-lg border border-subtle p-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--color-gold-50)] text-[var(--color-gold-700)]"><MapPin className="h-4 w-4" /></div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-fg-primary">{r.hospitalName} · {r.ward}</div>
                <div className="text-xs text-fg-tertiary">{formatDate(r.startDate)} → {formatDate(r.endDate)} · {r.shift} shift</div>
              </div>
              <Badge variant="gold" size="sm">Scheduled</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
