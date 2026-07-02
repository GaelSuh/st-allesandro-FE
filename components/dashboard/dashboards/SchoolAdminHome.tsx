"use client";

import Link from "next/link";
import { Activity, BookOpen, GraduationCap, Inbox, Megaphone, UserCheck, Users } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/stores";
import { getGreeting } from "@/lib/utils";
import { applications } from "@/data/admissions";
import { students } from "@/data/people";

export function SchoolAdminHome() {
  const user = useAuthStore((s) => s.user)!;
  const newApps = applications.filter((a) => a.status === "submitted" || a.status === "under_review");
  const recent = applications.slice(0, 5);

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow={getGreeting()}
        title="Registry dashboard"
        description="Live overview of admissions, enrolment and academic operations across the institute."
        actions={
          <>
            <Button asChild variant="secondary"><Link href="/dashboard/students"><Users className="h-4 w-4" />Students</Link></Button>
            <Button asChild><Link href="/dashboard/admissions"><Inbox className="h-4 w-4" />Admissions inbox</Link></Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total students" value={students.length.toLocaleString()} icon={Users} accent="brand" delta={{ value: 8, positive: true }} />
        <StatTile label="New applications" value={String(newApps.length)} icon={Inbox} accent="gold" delta={{ value: 18, positive: true }} />
        <StatTile label="Active courses" value="42" icon={BookOpen} accent="clinical" />
        <StatTile label="Attendance avg." value="91%" icon={UserCheck} accent="brand" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Latest applications</CardTitle>
            <CardDescription>Top of the admissions queue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-lg border border-subtle p-3">
                <Avatar name={a.applicantName} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-fg-primary">{a.applicantName}</div>
                  <div className="text-xs text-fg-tertiary">{a.programName} · {a.applicationNumber}</div>
                </div>
                <Badge size="sm" variant={a.status === "accepted" ? "success" : a.status === "rejected" ? "danger" : a.status === "interview" ? "gold" : "brand"}>
                  {a.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
            <Button asChild variant="ghost" size="sm" className="w-full"><Link href="/dashboard/admissions">Open all applications →</Link></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Operations health</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Timetables published", value: 100 },
              { label: "Lecturer schedules confirmed", value: 92 },
              { label: "Library catalog synced", value: 100 },
              { label: "Clinical rotations finalized", value: 78 },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-fg-secondary">{m.label}</span>
                  <span className="font-mono font-semibold text-fg-primary">{m.value}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-surface-sunken overflow-hidden">
                  <div className={`h-full ${m.value === 100 ? "bg-[oklch(0.55_0.155_155)]" : "bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-brand-700)]"}`} style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
