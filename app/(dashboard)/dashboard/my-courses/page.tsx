"use client";

import { BookOpen, Calendar, ChevronRight, Users } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { currentSemesterCourses } from "@/data/courses";
import Link from "next/link";

export default function MyCoursesPage() {
  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Academics"
        title="My courses"
        description="Semester 1 · 2025/26 — your enrolled courses, materials, assignments and class roster."
        actions={<Button asChild variant="secondary"><Link href="/dashboard/timetable"><Calendar className="h-4 w-4" />Weekly timetable</Link></Button>}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {currentSemesterCourses.map((c) => (
          <Card key={c.id} hover>
            <div className="bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-900)] p-5 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="font-mono text-xs opacity-80">{c.code}</div>
                <Badge variant="solid" size="sm" className="bg-white/15 ring-white/20">{c.credits} credits</Badge>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs text-white/70">{c.lecturer}</p>
            </div>
            <CardContent className="p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs"><span className="text-fg-tertiary">Progress</span><span className="font-semibold text-fg-primary">62%</span></div>
                <Progress value={62} className="mt-1.5" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-surface-sunken p-2">
                  <div className="text-fg-tertiary">Schedule</div>
                  <div className="mt-0.5 font-medium text-fg-primary truncate">{c.schedule}</div>
                </div>
                <div className="rounded-lg bg-surface-sunken p-2">
                  <div className="text-fg-tertiary inline-flex items-center gap-1"><Users className="h-3 w-3" /> Class</div>
                  <div className="mt-0.5 font-medium text-fg-primary">{c.enrolled}/{c.capacity}</div>
                </div>
              </div>
              <Link href="#" className="inline-flex items-center justify-between text-sm font-semibold text-[var(--color-brand-700)] hover:underline w-full">
                Open course materials <ChevronRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
