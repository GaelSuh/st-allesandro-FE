"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Users, Clock, User, GitBranch, BookOpen } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Avatar } from "@/components/ui/Avatar";
import { courses } from "@/data/courses";
import { programs } from "@/data/programs";
import { students } from "@/data/people";
import { results } from "@/data/academic";
import { percent } from "@/lib/utils";

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = useMemo(() => courses.find((c) => c.id === id), [id]);
  if (!course) return notFound();

  const program = programs.find((p) => p.id === course.programId);
  const roster = students.filter((s) => s.programId === course.programId).slice(0, 12);
  const courseResults = results.filter((r) => r.courseCode === course.code);
  const avg = courseResults.length
    ? Math.round(courseResults.reduce((a, r) => a + r.total, 0) / courseResults.length)
    : null;

  return (
    <div className="space-y-6">
      <Link href="/dashboard/courses" className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary">
        <ArrowLeft className="h-4 w-4" /> Back to courses
      </Link>

      <DashHeader
        eyebrow={`${course.code} · ${course.credits} credits`}
        title={course.title}
        description={program ? `${program.name} · ${program.department}` : undefined}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Course information</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <Info icon={<User className="h-4 w-4" />} label="Lecturer" value={course.lecturer} />
            <Info icon={<Clock className="h-4 w-4" />} label="Schedule" value={course.schedule} />
            <Info icon={<BookOpen className="h-4 w-4" />} label="Programme" value={program ? program.name : "—"} />
            <Info icon={<GitBranch className="h-4 w-4" />} label="Prerequisites" value={course.prerequisiteCodes.length ? course.prerequisiteCodes.join(", ") : "None"} />
            <div>
              <div className="flex items-center justify-between text-xs text-fg-tertiary"><span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />Enrollment</span><span className="font-mono text-fg-primary">{course.enrolled}/{course.capacity} ({percent(course.enrolled, course.capacity)}%)</span></div>
              <Progress value={(course.enrolled / course.capacity) * 100} className="mt-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Performance</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Info label="Graded records" value={`${courseResults.length}`} />
            <Info label="Class average" value={avg !== null ? `${avg}/100` : "—"} />
            <Info label="Pass rate" value={courseResults.length ? `${percent(courseResults.filter((r) => r.grade !== "F").length, courseResults.length)}%` : "—"} />
            <Info label="Seats left" value={`${Math.max(course.capacity - course.enrolled, 0)}`} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Enrolled students <span className="text-fg-tertiary font-normal">· sample of {roster.length}</span></CardTitle></CardHeader>
        <CardContent className="p-0">
          {roster.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                  <th className="p-4">Student</th><th className="p-4">Matricule</th><th className="p-4">Level</th><th className="p-4">CGPA</th>
                </tr></thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {roster.map((s) => (
                    <tr key={s.id} className="hover:bg-surface-sunken/40">
                      <td className="p-4"><Link href={`/dashboard/students/${s.id}`} className="flex items-center gap-3 group"><Avatar src={s.avatar} name={s.name} size="sm" /><span className="font-medium text-fg-primary group-hover:text-[var(--color-brand-600)]">{s.name}</span></Link></td>
                      <td className="p-4 font-mono text-xs text-fg-secondary">{s.matricule}</td>
                      <td className="p-4">{s.level}</td>
                      <td className="p-4 font-mono font-semibold">{s.cgpa.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="p-6 text-sm text-fg-tertiary">No students enrolled yet.</p>}
        </CardContent>
      </Card>
    </div>
  );
}

function Info({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-subtle pb-2 last:border-0 last:pb-0">
      <span className="inline-flex items-center gap-2 text-fg-tertiary text-xs uppercase tracking-wide">{icon}{label}</span>
      <span className="text-right font-medium text-fg-primary">{value}</span>
    </div>
  );
}
