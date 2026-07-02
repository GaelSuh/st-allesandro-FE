"use client";

import { useState } from "react";
import { CalendarDays, Hospital, MapPin, Search } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useClinicalStore } from "@/stores";
import { formatDate, percent } from "@/lib/utils";

export default function ClinicalRotationsPage() {
  const rotations = useClinicalStore((s) => s.rotations);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [q, setQ] = useState("");

  const filtered = rotations.filter((r) => !q || `${r.studentName} ${r.matricule} ${r.hospitalName} ${r.ward}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Clinical supervision"
        title="Rotations under my care"
        description="Assigned students across all current rotation cycles."
        actions={
          <Tabs value={view} onValueChange={(v) => setView(v as any)}><TabsList><TabsTrigger value="grid">Grid</TabsTrigger><TabsTrigger value="table">Table</TabsTrigger></TabsList></Tabs>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>{filtered.length} active assignments</CardTitle><CardDescription>Mon–Sun · all shifts</CardDescription></div>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student or hospital…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-72" />
          </div>
        </CardHeader>
        <CardContent>
          {view === "grid" ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <div key={r.id} className="rounded-xl border border-subtle p-4">
                  <div className="flex items-start gap-3">
                    <Avatar name={r.studentName} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-fg-primary truncate">{r.studentName}</div>
                      <div className="text-xs text-fg-tertiary font-mono">{r.matricule}</div>
                    </div>
                    <Badge size="sm" variant={r.status === "in_progress" ? "clinical" : r.status === "completed" ? "brand" : r.status === "evaluated" ? "success" : "neutral"}>{r.status.replace("_", " ")}</Badge>
                  </div>
                  <div className="mt-3 text-xs space-y-1">
                    <p className="inline-flex items-center gap-1 text-fg-secondary"><Hospital className="h-3 w-3" />{r.hospitalName}</p>
                    <p className="inline-flex items-center gap-1 text-fg-secondary"><MapPin className="h-3 w-3" />{r.ward} · {r.shift}</p>
                    <p className="inline-flex items-center gap-1 text-fg-tertiary"><CalendarDays className="h-3 w-3" />{formatDate(r.startDate)} → {formatDate(r.endDate)}</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px]"><span className="text-fg-tertiary">Hours</span><span className="font-mono font-semibold text-fg-primary">{r.hoursCompleted}/{r.hoursRequired}</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-surface-sunken overflow-hidden"><div className="h-full bg-gradient-to-r from-[var(--color-clinical-500)] to-[var(--color-clinical-700)]" style={{ width: `${percent(r.hoursCompleted, r.hoursRequired)}%` }} /></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                    <th className="pb-3">Student</th><th className="pb-3">Hospital · Ward</th><th className="pb-3">Shift</th><th className="pb-3">Dates</th><th className="pb-3">Hours</th><th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {filtered.map((r) => (
                    <tr key={r.id}>
                      <td className="py-3"><div className="flex items-center gap-3"><Avatar name={r.studentName} size="sm" /><div><div className="font-medium text-fg-primary">{r.studentName}</div><div className="text-xs text-fg-tertiary font-mono">{r.matricule}</div></div></div></td>
                      <td className="py-3 text-fg-secondary">{r.hospitalName} · {r.ward}</td>
                      <td className="py-3 text-fg-secondary">{r.shift}</td>
                      <td className="py-3 text-xs text-fg-tertiary">{formatDate(r.startDate)} → {formatDate(r.endDate)}</td>
                      <td className="py-3 font-mono">{r.hoursCompleted}/{r.hoursRequired}</td>
                      <td className="py-3"><Badge size="sm" variant={r.status === "in_progress" ? "clinical" : r.status === "completed" ? "brand" : r.status === "evaluated" ? "success" : "neutral"}>{r.status.replace("_", " ")}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
