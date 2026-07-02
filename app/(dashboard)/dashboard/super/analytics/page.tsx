"use client";

import { Activity, ArrowDown, ArrowUp, GraduationCap, Hospital, Users, Wallet } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { financeKPIs } from "@/data/finance";
import { formatCurrency } from "@/lib/utils";

const enrolByProgram = [
  { name: "B.Sc. Nursing", value: 820, color: "var(--color-clinical-600)" },
  { name: "HND Midwifery", value: 420, color: "var(--color-clinical-400)" },
  { name: "B.Sc. Med Lab", value: 290, color: "var(--color-brand-600)" },
  { name: "HND Pharmacy", value: 180, color: "var(--color-brand-400)" },
  { name: "HND Imaging", value: 120, color: "var(--color-gold-500)" },
  { name: "Other", value: 570, color: "var(--color-gold-300)" },
];

const yearOverYear = [
  { y: "2021", students: 1280, revenue: 380 },
  { y: "2022", students: 1540, revenue: 460 },
  { y: "2023", students: 1820, revenue: 540 },
  { y: "2024", students: 2110, revenue: 640 },
  { y: "2025", students: 2310, revenue: 720 },
  { y: "2026", students: 2400, revenue: 810 },
];

export default function AnalyticsPage() {
  const total = enrolByProgram.reduce((a, x) => a + x.value, 0);

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Analytics" title="Smart analytics" description="Institute-wide performance, enrolment, revenue and clinical impact." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total enrolled" value="2,400+" icon={GraduationCap} accent="brand" delta={{ value: 8, positive: true }} />
        <StatTile label="Revenue (YTD)" value={formatCurrency(financeKPIs.collectedThisMonth * 9)} icon={Wallet} accent="gold" delta={{ value: 14, positive: true }} />
        <StatTile label="Clinical partners" value="38" icon={Hospital} accent="clinical" />
        <StatTile label="Lecturer satisfaction" value="4.7/5" icon={Activity} accent="brand" delta={{ value: 3, positive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Enrolment by program</CardTitle><CardDescription>Snapshot · current academic year</CardDescription></CardHeader>
          <CardContent>
            <div className="flex items-end gap-1.5 h-44 mt-2">
              {enrolByProgram.map((b) => (
                <div key={b.name} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="text-[11px] font-mono font-semibold text-fg-primary">{b.value}</div>
                  <div className="w-full rounded-t-md" style={{ height: `${(b.value / Math.max(...enrolByProgram.map(x=>x.value))) * 100}%`, background: `linear-gradient(to top, ${b.color}, transparent 200%)` }} />
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {enrolByProgram.map((b) => (
                <div key={b.name} className="inline-flex items-center gap-2"><span className="h-2 w-3 rounded" style={{ background: b.color }} /><span className="text-fg-secondary truncate">{b.name}</span></div>
              ))}
            </div>
            <p className="mt-4 text-xs text-fg-tertiary">Total {total.toLocaleString()} students.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>5-year growth</CardTitle><CardDescription>Students vs revenue (millions FCFA)</CardDescription></CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-48 mt-2">
              {yearOverYear.map((y) => {
                const maxS = Math.max(...yearOverYear.map(x => x.students));
                const maxR = Math.max(...yearOverYear.map(x => x.revenue));
                return (
                  <div key={y.y} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full items-end justify-center gap-0.5 flex-1">
                      <div className="w-3.5 rounded-t-md bg-gradient-to-t from-[var(--color-brand-700)] to-[var(--color-brand-400)]" style={{ height: `${(y.students / maxS) * 100}%` }} title={`${y.students} students`} />
                      <div className="w-3.5 rounded-t-md bg-gradient-to-t from-[var(--color-gold-600)] to-[var(--color-gold-400)]" style={{ height: `${(y.revenue / maxR) * 100}%` }} title={`${y.revenue}M FCFA`} />
                    </div>
                    <div className="text-[10px] text-fg-tertiary">{y.y}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex justify-center gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded bg-[var(--color-brand-700)]" />Students</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded bg-[var(--color-gold-500)]" />Revenue (M FCFA)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Operational KPIs</CardTitle><CardDescription>Real-time metrics across modules</CardDescription></CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Pass rate", value: "96%", trend: 3, up: true },
              { label: "Attendance avg.", value: "91%", trend: 2, up: true },
              { label: "Tuition collection", value: "67%", trend: 4, up: true },
              { label: "Logbook completion", value: "78%", trend: 1, up: false },
              { label: "Lecturer fill rate", value: "92%", trend: 6, up: true },
              { label: "Clinical hours/student", value: "84h", trend: 8, up: true },
              { label: "Library usage", value: "62%", trend: 4, up: false },
              { label: "Hostel occupancy", value: "88%", trend: 5, up: true },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-subtle p-4">
                <div className="text-xs text-fg-tertiary">{m.label}</div>
                <div className="mt-1 font-display text-2xl font-semibold text-fg-primary">{m.value}</div>
                <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${m.up ? "text-[oklch(0.50_0.155_155)]" : "text-[oklch(0.55_0.205_25)]"}`}>
                  {m.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />} {m.trend}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
