"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Mail, Phone, Star, Calendar, BookOpen, Users, MessageSquare } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { lecturers } from "@/data/people";
import { courses } from "@/data/courses";
import { formatDate } from "@/lib/utils";

export default function LecturerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lecturer = useMemo(() => lecturers.find((l) => l.id === id), [id]);
  if (!lecturer) return notFound();

  const taught = courses.filter((c) => c.lecturer === lecturer.name);
  const totalStudents = taught.reduce((a, c) => a + c.enrolled, 0);
  const deptVariant = lecturer.department.includes("Nutrition") ? "gold" : lecturer.department.includes("Nursing") ? "clinical" : "brand";

  return (
    <div className="space-y-6">
      <Link href="/dashboard/lecturers" className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary">
        <ArrowLeft className="h-4 w-4" /> Back to faculty
      </Link>

      <DashHeader
        eyebrow="Faculty member"
        title={lecturer.name}
        description={lecturer.title}
        actions={<Button variant="secondary" leftIcon={<MessageSquare className="h-4 w-4" />} onClick={() => toast.success(`Message drafted to ${lecturer.name}`)}>Message</Button>}
      />

      <Card>
        <CardContent className="p-6 flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar src={lecturer.avatar} name={lecturer.name} size="2xl" ring />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-xl font-semibold text-fg-primary">{lecturer.name}</span>
              <Badge size="sm" variant={deptVariant as "gold" | "clinical" | "brand"}>{lecturer.department.replace("School of ", "")}</Badge>
            </div>
            <p className="mt-1 text-sm text-fg-secondary">{lecturer.specialty}</p>
            <div className="mt-3 grid gap-1.5 text-sm text-fg-secondary sm:grid-cols-2">
              <div className="inline-flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{lecturer.email}</div>
              <div className="inline-flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{lecturer.phone}</div>
              <div className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />Joined {formatDate(lecturer.joinedAt, { year: "numeric", month: "long" })}</div>
              <div className="inline-flex items-center gap-2 text-[var(--color-gold-700)] font-semibold"><Star className="h-3.5 w-3.5 fill-current" />{lecturer.rating.toFixed(1)} rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={<BookOpen className="h-4 w-4" />} label="Courses" value={`${taught.length || lecturer.coursesCount}`} />
        <Stat icon={<Users className="h-4 w-4" />} label="Students taught" value={`${totalStudents}`} />
        <Stat icon={<Star className="h-4 w-4" />} label="Avg. rating" value={lecturer.rating.toFixed(1)} />
      </div>

      <Card>
        <CardHeader><CardTitle>Courses taught</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {taught.length ? taught.map((c) => (
            <Link key={c.id} href={`/dashboard/courses/${c.id}`} className="flex items-center justify-between rounded-xl border border-subtle p-3 hover:border-strong hover:bg-surface-sunken/40 transition-colors">
              <div>
                <div className="font-medium text-fg-primary text-sm">{c.title}</div>
                <div className="text-xs text-fg-tertiary font-mono">{c.code} · {c.schedule}</div>
              </div>
              <Badge size="sm" variant="brand">{c.enrolled}/{c.capacity}</Badge>
            </Link>
          )) : <p className="text-sm text-fg-tertiary">No courses assigned this semester.</p>}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-fg-tertiary">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-sunken">{icon}</span>
          <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
        </div>
        <div className="mt-3 font-display text-2xl font-semibold text-fg-primary">{value}</div>
      </CardContent>
    </Card>
  );
}
