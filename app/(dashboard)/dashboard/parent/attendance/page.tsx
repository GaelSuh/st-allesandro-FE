"use client";

import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatTile } from "@/components/ui/StatTile";
import { ClipboardCheck } from "lucide-react";

const att = [
  { date: "27 May 2026", course: "NUR-305 · Med-Surg I", status: "present" },
  { date: "26 May 2026", course: "NUR-307 · OB-GYN", status: "present" },
  { date: "26 May 2026", course: "NUR-303 · Ethics", status: "late" },
  { date: "25 May 2026", course: "NUR-307", status: "absent" },
  { date: "24 May 2026", course: "NUR-305", status: "present" },
];

export default function ParentAttendancePage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Attendance" title="Class & clinical attendance" description="Daily attendance records for your sponsored student." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Overall" value="94%" icon={ClipboardCheck} accent="clinical" />
        <StatTile label="This week" value="92%" icon={ClipboardCheck} accent="brand" />
        <StatTile label="Absences (sem)" value="3" accent="gold" />
      </div>
      <Card>
        <CardHeader><CardTitle>Recent records</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle"><th className="pb-3">Date</th><th className="pb-3">Course</th><th className="pb-3">Status</th></tr></thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {att.map((a, i) => <tr key={i}><td className="py-3 text-fg-primary">{a.date}</td><td className="py-3 text-fg-secondary">{a.course}</td><td className="py-3"><Badge size="sm" variant={a.status === "present" ? "success" : a.status === "late" ? "warning" : "danger"} dot>{a.status}</Badge></td></tr>)}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
