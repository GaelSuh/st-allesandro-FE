"use client";

import Link from "next/link";
import { BookOpen, Calendar, ClipboardCheck, Megaphone, MessageSquare, UserCheck, Users } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/stores";
import { getGreeting } from "@/lib/utils";

export function LecturerHome() {
  const user = useAuthStore((s) => s.user)!;
  const myCourses = [
    { code: "NUR-307", title: "OB-GYN Nursing", students: 60, nextClass: "Today · 11:00", avgScore: 71 },
    { code: "NUR-205", title: "Nursing Foundations II", students: 84, nextClass: "Thu · 14:00", avgScore: 68 },
    { code: "NUR-405", title: "Advanced Maternal Health", students: 32, nextClass: "Fri · 09:00", avgScore: 76 },
  ];
  const recentSubmissions = [
    { student: "Aïcha Fadimatou", course: "NUR-307", item: "Case study #4", at: "12 min ago" },
    { student: "Esther Owono", course: "NUR-307", item: "Reflective journal", at: "1 hr ago" },
    { student: "Linda Tagne", course: "NUR-205", item: "Mid-term essay", at: "3 hrs ago" },
    { student: "Steve Atangana", course: "NUR-405", item: "Care plan submission", at: "6 hrs ago" },
  ];

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow={getGreeting()}
        title={<>Welcome, <span className="gradient-text-brand">{user.name.split(" ").pop()}</span></>}
        description="Your teaching cockpit — courses, attendance, grading queue and student communication in one view."
        actions={
          <>
            <Button asChild variant="secondary"><Link href="/dashboard/lecturer/attendance"><UserCheck className="h-4 w-4" />Record attendance</Link></Button>
            <Button asChild><Link href="/dashboard/lecturer/announcements"><Megaphone className="h-4 w-4" />New announcement</Link></Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="My courses" value="3" icon={BookOpen} accent="brand" />
        <StatTile label="Total students" value="176" icon={Users} accent="clinical" />
        <StatTile label="Pending grading" value="24" icon={ClipboardCheck} accent="gold" delta={{ value: 8, positive: false, label: "vs yesterday" }} />
        <StatTile label="Avg. rating" value="4.8" icon={UserCheck} accent="brand" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>My courses this semester</CardTitle>
            <CardDescription>Click a course to open class roster, materials and gradebook.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {myCourses.map((c) => (
              <div key={c.code} className="flex items-center gap-4 rounded-xl border border-subtle p-4 hover:bg-surface-sunken/50 transition-colors">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-brand-50)] font-mono text-xs font-semibold text-[var(--color-brand-700)]">
                  {c.code.split("-")[1]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-fg-primary">{c.title}</div>
                  <div className="text-xs text-fg-tertiary">{c.code} · {c.students} students · next class {c.nextClass}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-fg-tertiary">Class avg.</div>
                  <div className="font-mono font-semibold text-fg-primary">{c.avgScore}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent submissions</CardTitle><CardDescription>Awaiting grading</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {recentSubmissions.map((r, i) => (
              <div key={i} className="flex items-center gap-3 border-b border-subtle pb-3 last:border-0 last:pb-0">
                <Avatar name={r.student} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-fg-primary truncate">{r.item}</div>
                  <div className="text-xs text-fg-tertiary">{r.student} · {r.course}</div>
                </div>
                <span className="text-[11px] text-fg-tertiary whitespace-nowrap">{r.at}</span>
              </div>
            ))}
            <Button asChild variant="ghost" size="sm" className="w-full"><Link href="/dashboard/lecturer/grading">Open grading queue →</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
