"use client";

import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ClipboardCheck, TrendingDown, TrendingUp } from "lucide-react";

const byDept = [
  { dept: "Nursing", att: 92, trend: 2, up: true },
  { dept: "Allied Health Sciences", att: 89, trend: 1, up: false },
  { dept: "Business & Administration", att: 94, trend: 3, up: true },
  { dept: "Food Technology & Wine", att: 87, trend: 4, up: true },
  { dept: "Early Childhood Education", att: 95, trend: 1, up: true },
];

export default function AdminAttendancePage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Academic operations" title="Attendance analytics" description="Institution-wide attendance across departments and programs." />
      <div className="grid gap-4 sm:grid-cols-4">
        <StatTile label="Overall avg." value="91%" icon={ClipboardCheck} accent="clinical" />
        <StatTile label="At-risk students" value="42" accent="gold" />
        <StatTile label="Perfect attendance" value="218" accent="brand" />
        <StatTile label="Method · QR usage" value="73%" accent="brand" />
      </div>
      <Card>
        <CardHeader><CardTitle>Attendance by department</CardTitle><CardDescription>4-week rolling average</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {byDept.map((d) => (
              <div key={d.dept} className="rounded-lg border border-subtle p-4">
                <div className="flex items-center justify-between"><span className="text-sm font-semibold text-fg-primary">{d.dept}</span><span className={`inline-flex items-center gap-1 text-xs font-medium ${d.up ? "text-[oklch(0.50_0.155_155)]" : "text-[oklch(0.55_0.205_25)]"}`}>{d.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{d.trend}%</span></div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-surface-sunken overflow-hidden"><div className="h-full bg-gradient-to-r from-[var(--color-clinical-500)] to-[var(--color-clinical-700)]" style={{ width: `${d.att}%` }} /></div>
                  <span className="font-mono font-semibold text-fg-primary">{d.att}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
