"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Users } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Progress } from "@/components/ui/Progress";
import { courses } from "@/data/courses";

export default function AdminCoursesPage() {
  const [q, setQ] = useState("");
  const filtered = courses.filter((c) => !q || `${c.code} ${c.title} ${c.lecturer}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Curriculum" title="Courses" description="All courses offered this semester across departments." actions={<Button leftIcon={<Plus className="h-4 w-4" />}>New course</Button>} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{filtered.length} active courses</CardTitle>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…" leftIcon={<Search className="h-4 w-4" />} className="max-w-xs" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c) => (
              <Card key={c.id} hover className="transition-colors hover:border-strong">
                <Link href={`/dashboard/courses/${c.id}`} className="block p-5">
                <div className="flex items-start justify-between gap-3"><div><div className="font-mono text-xs text-fg-tertiary">{c.code}</div><h3 className="mt-1 font-semibold text-fg-primary">{c.title}</h3></div><Badge size="sm" variant="brand">{c.credits} cr</Badge></div>
                <p className="mt-2 text-xs text-fg-secondary">{c.lecturer}</p>
                <p className="mt-1 text-xs text-fg-tertiary">{c.schedule}</p>
                <div className="mt-3 flex items-center justify-between text-xs"><span className="text-fg-tertiary inline-flex items-center gap-1"><Users className="h-3 w-3" />Enrolled</span><span className="font-mono font-semibold text-fg-primary">{c.enrolled}/{c.capacity}</span></div>
                <Progress value={(c.enrolled / c.capacity) * 100} className="mt-1.5" />
                </Link>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
