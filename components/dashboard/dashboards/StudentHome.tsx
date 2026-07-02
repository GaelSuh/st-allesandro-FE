"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Beaker,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  Hospital,
  HeartPulse,
  Sparkles,
  Wallet,
} from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores";
import { currentSemesterCourses } from "@/data/courses";
import { myResults } from "@/data/academic";
import { formatCurrency, formatTime, getGreeting, percent } from "@/lib/utils";
import { announcements } from "@/data/notifications";

export function StudentHome() {
  const user = useAuthStore((s) => s.user)!;
  // The current logged-in demo student stats
  const feesPct = percent(612_500, 850_000);
  const cgpa = 3.62;
  const attendance = 94;
  const clinicalHours = 88;
  const clinicalRequired = 120;

  const todayClasses = [
    { code: "NUR-305", title: "Medical–Surgical Nursing I", time: "08:00 – 10:00", room: "Hall A2", lecturer: "Mr. J. Bisseck", status: "now" },
    { code: "NUR-307", title: "OB-GYN Nursing", time: "11:00 – 13:00", room: "Sim Lab 1", lecturer: "Mme. S. Owono", status: "upcoming" },
    { code: "NUR-303", title: "Professional Ethics & Law", time: "14:00 – 16:00", room: "Hall B", lecturer: "Dr. L. Ngono", status: "upcoming" },
  ];

  const announceForStudent = announcements.filter((a) => a.audience === "all" || (Array.isArray(a.audience) && a.audience.includes("student")));

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow={getGreeting()}
        title={<>Welcome back, <span className="gradient-text-brand">{user.name.split(" ")[0]}</span>.</>}
        description="Here's your snapshot for today — fees, classes, clinical hours and the next steps in your nursing journey."
        actions={
          <>
            <Button asChild variant="secondary"><Link href="/dashboard/timetable"><CalendarDays className="h-4 w-4" />Full schedule</Link></Button>
            <Button asChild variant="primary"><Link href="/dashboard/finance"><Wallet className="h-4 w-4" />Pay tuition</Link></Button>
          </>
        }
      />

      {/* Top stat row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="CGPA" value={cgpa.toFixed(2)} icon={Award} accent="brand" delta={{ value: 4, positive: true, label: "vs last semester" }} />
        <StatTile label="Attendance" value={`${attendance}%`} icon={ClipboardCheck} accent="clinical" delta={{ value: 2, positive: true, label: "this month" }} />
        <StatTile label="Clinical hours" value={`${clinicalHours}/${clinicalRequired}`} icon={HeartPulse} accent="gold" />
        <StatTile label="Fees balance" value={formatCurrency(850_000 - 612_500)} icon={Wallet} accent="neutral" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Today's schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's schedule</CardTitle>
              <CardDescription>Wednesday · 3 classes · all on main campus</CardDescription>
            </div>
            <Link href="/dashboard/timetable" className="text-xs font-semibold text-[var(--color-brand-700)] hover:underline">Open week →</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayClasses.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-xl border border-subtle bg-surface-sunken/40 p-4"
              >
                <div className="grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-surface text-center text-xs font-mono ring-1 ring-[var(--border-default)]">
                  <div className="font-semibold text-fg-primary">{c.time.split(" – ")[0]}</div>
                  <div className="text-[10px] text-fg-tertiary">{c.time.split(" – ")[1]}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-fg-tertiary">{c.code}</span>
                    {c.status === "now" && (
                      <Badge variant="success" size="sm" dot>Live now</Badge>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-sm font-semibold text-fg-primary">{c.title}</div>
                  <div className="text-xs text-fg-tertiary">{c.room} · {c.lecturer}</div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Fees & academic progress */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tuition · Semester 1</CardTitle>
              <CardDescription>Next installment due in 14 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl font-semibold text-fg-primary">{feesPct}%</span>
                <span className="text-sm text-fg-secondary">{formatCurrency(612_500)} / {formatCurrency(850_000)}</span>
              </div>
              <Progress value={feesPct} className="mt-3" indicatorClassName="bg-gradient-to-r from-[var(--color-gold-400)] to-[var(--color-gold-600)]" />
              <Button asChild className="mt-5 w-full" variant="gold"><Link href="/dashboard/finance"><CreditCard className="h-4 w-4" />Make a payment</Link></Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clinical rotation</CardTitle>
              <CardDescription>Current placement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)]">
                  <Hospital className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-fg-primary">Laquintinie Hospital</div>
                  <div className="text-xs text-fg-tertiary">Maternity ward · Morning shift · Until 30 Nov</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-fg-tertiary">Hours logged</span>
                  <span className="font-semibold text-fg-primary">{clinicalHours} / {clinicalRequired}</span>
                </div>
                <Progress value={percent(clinicalHours, clinicalRequired)} className="mt-1.5" indicatorClassName="bg-gradient-to-r from-[var(--color-clinical-500)] to-[var(--color-clinical-700)]" />
              </div>
              <Button asChild variant="secondary" className="mt-4 w-full"><Link href="/dashboard/logbook"><ClipboardList className="h-4 w-4" />Open logbook</Link></Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Latest results + announcements */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle>Latest results</CardTitle><CardDescription>Semester 1 · 2025/26</CardDescription></div>
            <Link href="/dashboard/results" className="text-xs font-semibold text-[var(--color-brand-700)] hover:underline">View all →</Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary">
                    <th className="pb-3">Course</th>
                    <th className="pb-3">CA</th>
                    <th className="pb-3">Exam</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {myResults.map((r) => (
                    <tr key={r.id} className="text-fg-primary">
                      <td className="py-2.5"><div className="font-medium">{r.courseCode}</div><div className="text-xs text-fg-tertiary">{r.courseTitle}</div></td>
                      <td className="py-2.5">{r.ca}</td>
                      <td className="py-2.5">{r.exam}</td>
                      <td className="py-2.5 font-semibold">{r.total}</td>
                      <td className="py-2.5">
                        <Badge variant={r.grade === "A" || r.grade === "B+" ? "success" : r.grade === "B" || r.grade === "C+" ? "brand" : r.grade === "F" ? "danger" : "warning"} size="sm">{r.grade}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Announcements</CardTitle><CardDescription>From your faculty & finance</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {announceForStudent.slice(0, 3).map((a) => (
              <div key={a.id} className="rounded-lg border border-subtle p-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge size="sm" variant={a.category === "Finance" ? "gold" : a.category === "Clinical" ? "clinical" : "brand"}>{a.category}</Badge>
                  {a.pinned && <span className="text-[10px] font-medium uppercase tracking-wider text-fg-tertiary">Pinned</span>}
                </div>
                <p className="mt-2 text-sm font-semibold text-fg-primary">{a.title}</p>
                <p className="mt-1 text-xs text-fg-secondary line-clamp-2">{a.body}</p>
                <p className="mt-2 text-[10px] text-fg-tertiary">By {a.author}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
