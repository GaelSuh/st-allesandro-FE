"use client";

import Link from "next/link";
import { BookOpen, FileUp, Megaphone, Users } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

const myCourses = [
  { code: "NUR-307", title: "OB-GYN Nursing", students: 60, sessions: 18, progress: 62, avg: 71, materials: 12 },
  { code: "NUR-205", title: "Nursing Foundations II", students: 84, sessions: 16, progress: 55, avg: 68, materials: 9 },
  { code: "NUR-405", title: "Advanced Maternal Health", students: 32, sessions: 12, progress: 48, avg: 76, materials: 7 },
];

export default function LecturerCoursesPage() {
  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Teaching"
        title="My courses"
        description="Course materials, attendance and grading — fully integrated."
        actions={<Button leftIcon={<FileUp className="h-4 w-4" />}>Upload material</Button>}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {myCourses.map((c) => (
          <Card key={c.code} hover className="overflow-hidden">
            <div className="bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-900)] p-5 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-xs opacity-80">{c.code}</div>
                  <h3 className="mt-1 font-display text-lg font-semibold">{c.title}</h3>
                </div>
                <Badge variant="solid" size="sm" className="bg-white/15 ring-white/20">Live</Badge>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-white/70"><Users className="h-3 w-3" />{c.students} students</div>
            </div>
            <CardContent className="p-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs"><span className="text-fg-tertiary">Syllabus progress</span><span className="font-semibold text-fg-primary">{c.progress}%</span></div>
                <Progress value={c.progress} className="mt-1.5" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg bg-surface-sunken p-2"><div className="text-fg-tertiary">Sessions</div><div className="mt-0.5 font-semibold text-fg-primary">{c.sessions}</div></div>
                <div className="rounded-lg bg-surface-sunken p-2"><div className="text-fg-tertiary">Class avg.</div><div className="mt-0.5 font-semibold text-fg-primary">{c.avg}%</div></div>
                <div className="rounded-lg bg-surface-sunken p-2"><div className="text-fg-tertiary">Materials</div><div className="mt-0.5 font-semibold text-fg-primary">{c.materials}</div></div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1"><Users className="h-3.5 w-3.5" />Roster</Button>
                <Button variant="secondary" size="sm" className="flex-1"><Megaphone className="h-3.5 w-3.5" />Announce</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
