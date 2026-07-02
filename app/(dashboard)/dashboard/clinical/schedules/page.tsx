"use client";

import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useClinicalStore } from "@/stores";
import { formatDate } from "@/lib/utils";

const shifts = [
  { day: "Mon", morning: 6, afternoon: 4, night: 2 },
  { day: "Tue", morning: 6, afternoon: 4, night: 2 },
  { day: "Wed", morning: 6, afternoon: 4, night: 2 },
  { day: "Thu", morning: 6, afternoon: 4, night: 2 },
  { day: "Fri", morning: 6, afternoon: 4, night: 2 },
  { day: "Sat", morning: 4, afternoon: 3, night: 2 },
  { day: "Sun", morning: 3, afternoon: 2, night: 2 },
];

export default function CSSchedulesPage() {
  const rotations = useClinicalStore((s) => s.rotations).slice(0, 6);
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Clinical" title="Schedules & shifts" description="Ward rosters and shift coverage." />
      <Card>
        <CardHeader><CardTitle>Weekly shift coverage</CardTitle><CardDescription>Students per shift across all wards</CardDescription></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle"><th className="pb-3">Day</th><th className="pb-3">Morning</th><th className="pb-3">Afternoon</th><th className="pb-3">Night</th></tr></thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {shifts.map((s) => (
                <tr key={s.day}>
                  <td className="py-3 font-semibold text-fg-primary">{s.day}</td>
                  <td className="py-3"><Bar value={s.morning} max={6} color="brand" /></td>
                  <td className="py-3"><Bar value={s.afternoon} max={6} color="gold" /></td>
                  <td className="py-3"><Bar value={s.night} max={6} color="clinical" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Upcoming rotation cycles</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {rotations.map((r) => (
            <div key={r.id} className="flex items-center gap-3 rounded-lg border border-subtle p-3">
              <div className="min-w-0 flex-1"><div className="text-sm font-semibold text-fg-primary">{r.studentName}</div><div className="text-xs text-fg-tertiary">{r.hospitalName} · {r.ward} · {r.shift} shift · {formatDate(r.startDate)}</div></div>
              <Badge size="sm" variant={r.status === "in_progress" ? "clinical" : "neutral"}>{r.status.replace("_", " ")}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Bar({ value, max, color }: { value: number; max: number; color: "brand"|"gold"|"clinical" }) {
  const map = { brand: "from-[var(--color-brand-500)] to-[var(--color-brand-700)]", gold: "from-[var(--color-gold-400)] to-[var(--color-gold-600)]", clinical: "from-[var(--color-clinical-500)] to-[var(--color-clinical-700)]" };
  return <div className="flex items-center gap-2"><div className="flex-1 h-1.5 rounded-full bg-surface-sunken overflow-hidden"><div className={`h-full bg-gradient-to-r ${map[color]}`} style={{ width: `${(value / max) * 100}%` }} /></div><span className="font-mono text-xs font-semibold text-fg-primary w-6">{value}</span></div>;
}
