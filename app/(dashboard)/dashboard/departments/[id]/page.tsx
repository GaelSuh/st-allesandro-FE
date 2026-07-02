"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Users, GraduationCap, BookOpen, Star } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { departments } from "@/data/departments";
import { programs } from "@/data/programs";
import { getFeeTier } from "@/data/feeTiers";
import { lecturers, students } from "@/data/people";
import { courses } from "@/data/courses";
import { formatCurrency } from "@/lib/utils";

export default function DepartmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dept = useMemo(() => departments.find((d) => d.id === id), [id]);
  if (!dept) return notFound();

  const deptPrograms = programs.filter((p) => p.department === dept.name);
  const deptLecturers = lecturers.filter((l) => l.department === dept.name);
  const deptStudents = students.filter((s) => s.department === dept.name);
  const deptCourses = courses.filter((c) => deptPrograms.some((p) => p.id === c.programId));

  return (
    <div className="space-y-6">
      <Link href="/dashboard/departments" className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary">
        <ArrowLeft className="h-4 w-4" /> Back to departments
      </Link>

      <DashHeader eyebrow="Faculty" title={dept.name} description={dept.description} />

      <Card>
        <CardContent className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-sunken text-fg-secondary"><Building2 className="h-6 w-6" /></span>
            <div>
              <div className="text-xs uppercase tracking-wide text-fg-tertiary">Dean / Head of faculty</div>
              <div className="font-display text-lg font-semibold text-fg-primary">{dept.head}</div>
            </div>
          </div>
          <Badge variant={dept.color === "gold" ? "gold" : dept.color === "clinical" ? "clinical" : "brand"}>{dept.color === "gold" || dept.color === "clinical" ? "Flagship school" : "Faculty"}</Badge>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<BookOpen className="h-4 w-4" />} label="Programmes" value={`${deptPrograms.length || dept.programs}`} />
        <Stat icon={<Users className="h-4 w-4" />} label="Faculty" value={`${dept.staff}`} hint={`${deptLecturers.length} on directory`} />
        <Stat icon={<GraduationCap className="h-4 w-4" />} label="Students" value={dept.students.toLocaleString()} hint={`${deptStudents.length} in registry sample`} />
        <Stat icon={<BookOpen className="h-4 w-4" />} label="Active courses" value={`${deptCourses.length}`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Programmes offered</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {deptPrograms.length ? deptPrograms.map((p) => (
              <Link key={p.id} href={`/programs/${p.id}`} className="flex items-center justify-between rounded-xl border border-subtle p-3 hover:border-strong hover:bg-surface-sunken/40 transition-colors">
                <div>
                  <div className="font-medium text-fg-primary text-sm">{p.name}</div>
                  <div className="text-xs text-fg-tertiary font-mono">{p.code} · {p.level} · {p.duration}</div>
                </div>
                <div className="text-right text-xs text-fg-secondary">{formatCurrency(getFeeTier(p.feeTierId).totalCost)}<div className="text-fg-tertiary">total</div></div>
              </Link>
            )) : <p className="text-sm text-fg-tertiary">No programmes listed.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Faculty members</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {deptLecturers.length ? deptLecturers.map((l) => (
              <Link key={l.id} href={`/dashboard/lecturers/${l.id}`} className="flex items-center gap-3 rounded-xl border border-subtle p-3 hover:border-strong hover:bg-surface-sunken/40 transition-colors">
                <Avatar src={l.avatar} name={l.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-fg-primary text-sm truncate">{l.name}</div>
                  <div className="text-xs text-fg-tertiary truncate">{l.title}</div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-gold-700)]"><Star className="h-3.5 w-3.5 fill-current" />{l.rating.toFixed(1)}</span>
              </Link>
            )) : <p className="text-sm text-fg-tertiary">No faculty on the directory yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint?: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-fg-tertiary">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-sunken">{icon}</span>
          <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
        </div>
        <div className="mt-3 font-display text-2xl font-semibold text-fg-primary">{value}</div>
        {hint && <div className="mt-0.5 text-xs text-fg-tertiary">{hint}</div>}
      </CardContent>
    </Card>
  );
}
