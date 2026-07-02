"use client";

import { DashHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Award, TrendingUp } from "lucide-react";
import { myResults } from "@/data/academic";

export default function ParentAcademicPage() {
  const gpa = (myResults.reduce((acc, r) => acc + r.point * r.credits, 0) / myResults.reduce((acc, r) => acc + r.credits, 0)).toFixed(2);
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Academic progress" title="Your sponsored student's results" description="Real-time visibility into academic performance and standing." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Current GPA" value={gpa} icon={TrendingUp} accent="brand" />
        <StatTile label="CGPA" value="3.62" icon={Award} accent="clinical" />
        <StatTile label="Standing" value="Good" accent="gold" />
      </div>
      <Card>
        <CardHeader><CardTitle>Semester 1 results</CardTitle><CardDescription>Yolande Mvondo · SAUI/22/0421 · B.Sc. Nursing, Year 3</CardDescription></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle"><th className="pb-3">Course</th><th className="pb-3">Credits</th><th className="pb-3">Total</th><th className="pb-3">Grade</th></tr></thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {myResults.map((r) => (
                <tr key={r.id}><td className="py-3"><div className="font-medium text-fg-primary">{r.courseCode}</div><div className="text-xs text-fg-tertiary">{r.courseTitle}</div></td><td className="py-3">{r.credits}</td><td className="py-3 font-semibold">{r.total}</td><td className="py-3"><Badge size="sm" variant={r.grade === "A" || r.grade === "B+" ? "success" : r.grade === "F" ? "danger" : "brand"}>{r.grade}</Badge></td></tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
