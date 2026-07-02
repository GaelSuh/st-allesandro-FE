"use client";

import { Download, FileText, TrendingUp } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { myResults } from "@/data/academic";

export default function StudentResultsPage() {
  const totalCredits = myResults.reduce((acc, r) => acc + r.credits, 0);
  const weightedPoints = myResults.reduce((acc, r) => acc + r.point * r.credits, 0);
  const gpa = (weightedPoints / totalCredits).toFixed(2);
  const passed = myResults.filter((r) => r.grade !== "F").length;

  const semesterHistory = [
    { semester: "Y1 · S1", gpa: 3.20 },
    { semester: "Y1 · S2", gpa: 3.45 },
    { semester: "Y2 · S1", gpa: 3.55 },
    { semester: "Y2 · S2", gpa: 3.58 },
    { semester: "Y3 · S1", gpa: parseFloat(gpa) },
  ];

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Academic record"
        title="Results"
        description="Your published results across all semesters. Download your transcript for sponsor or licensing purposes."
        actions={
          <>
            <Button variant="secondary" leftIcon={<FileText className="h-4 w-4" />}>Request transcript</Button>
            <Button leftIcon={<Download className="h-4 w-4" />}>Download semester PDF</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Semester GPA" value={gpa} icon={TrendingUp} accent="brand" delta={{ value: 4, positive: true, label: "vs last sem" }} />
        <StatTile label="CGPA" value="3.62" icon={TrendingUp} accent="clinical" />
        <StatTile label="Credits earned" value={totalCredits} accent="gold" />
        <StatTile label="Courses passed" value={`${passed}/${myResults.length}`} accent="brand" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Semester 1 · 2025/26</CardTitle>
            <CardDescription>All results approved by faculty board</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                    <th className="pb-3 pt-1">Course</th>
                    <th className="pb-3">Credits</th>
                    <th className="pb-3">CA</th>
                    <th className="pb-3">Exam</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Grade</th>
                    <th className="pb-3">Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {myResults.map((r) => (
                    <tr key={r.id}>
                      <td className="py-3"><div className="font-medium text-fg-primary">{r.courseCode}</div><div className="text-xs text-fg-tertiary">{r.courseTitle}</div></td>
                      <td className="py-3">{r.credits}</td>
                      <td className="py-3">{r.ca}</td>
                      <td className="py-3">{r.exam}</td>
                      <td className="py-3 font-semibold">{r.total}</td>
                      <td className="py-3">
                        <Badge size="sm" variant={r.grade === "A" || r.grade === "B+" ? "success" : r.grade === "B" || r.grade === "C+" ? "brand" : r.grade === "F" ? "danger" : "warning"}>{r.grade}</Badge>
                      </td>
                      <td className="py-3 font-mono">{r.point.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-default">
                    <td className="pt-4 font-semibold text-fg-primary" colSpan={4}>Semester totals</td>
                    <td className="pt-4 font-semibold text-fg-primary">{totalCredits} cr</td>
                    <td className="pt-4"></td>
                    <td className="pt-4 font-display text-lg font-semibold text-[var(--color-brand-700)]">GPA {gpa}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>GPA trend</CardTitle><CardDescription>Last 5 semesters</CardDescription></CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-44 pt-4">
              {semesterHistory.map((s) => (
                <div key={s.semester} className="flex flex-1 flex-col items-center gap-2">
                  <div className="text-[11px] font-mono font-semibold text-fg-primary">{s.gpa.toFixed(2)}</div>
                  <div className="w-full rounded-t-md bg-gradient-to-t from-[var(--color-brand-700)] to-[var(--color-brand-400)]" style={{ height: `${(s.gpa / 4) * 100}%` }} />
                  <div className="text-[10px] text-fg-tertiary text-center">{s.semester}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
