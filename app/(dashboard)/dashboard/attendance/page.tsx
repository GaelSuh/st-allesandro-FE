"use client";

import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ClipboardCheck, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function StudentAttendancePage() {
  const attendance = [
    { date: "27 May 2026", course: "NUR-305 · Med-Surg I", status: "present", method: "QR" },
    { date: "27 May 2026", course: "NUR-307 · OB-GYN", status: "present", method: "QR" },
    { date: "26 May 2026", course: "NUR-303 · Ethics", status: "late", method: "Manual" },
    { date: "26 May 2026", course: "NUR-305", status: "present", method: "QR" },
    { date: "25 May 2026", course: "NUR-307", status: "absent", method: "QR" },
    { date: "25 May 2026", course: "NUR-204 · Pharmacology", status: "present", method: "Biometric" },
    { date: "24 May 2026", course: "NUR-305", status: "present", method: "QR" },
  ];

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Attendance"
        title="My attendance"
        description="Class and clinical attendance with method of recording. Tap below to mark today's class."
        actions={<Button leftIcon={<QrCode className="h-4 w-4" />}>Scan class QR</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatTile label="Overall" value="94%" icon={ClipboardCheck} accent="clinical" />
        <StatTile label="This week" value="92%" icon={ClipboardCheck} accent="brand" />
        <StatTile label="Absences" value="3" accent="gold" />
        <StatTile label="Late arrivals" value="2" accent="neutral" />
      </div>

      <Card>
        <CardHeader><CardTitle>Recent records</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                <th className="pb-3">Date</th><th className="pb-3">Course</th><th className="pb-3">Method</th><th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {attendance.map((a, i) => (
                <tr key={i}>
                  <td className="py-3 text-fg-primary">{a.date}</td>
                  <td className="py-3 text-fg-secondary">{a.course}</td>
                  <td className="py-3"><Badge variant="neutral" size="sm">{a.method}</Badge></td>
                  <td className="py-3"><Badge size="sm" variant={a.status === "present" ? "success" : a.status === "late" ? "warning" : "danger"} dot>{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
