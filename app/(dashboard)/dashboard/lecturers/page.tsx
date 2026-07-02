"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Star } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { lecturers } from "@/data/people";

export default function LecturersAdminPage() {
  const [q, setQ] = useState("");
  const filtered = lecturers.filter((l) => !q || `${l.name} ${l.department} ${l.specialty}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Faculty" title="Lecturers" description={`${lecturers.length} faculty across all departments`} actions={<Button leftIcon={<Plus className="h-4 w-4" />}>Add lecturer</Button>} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Directory</CardTitle>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search faculty…" leftIcon={<Search className="h-4 w-4" />} className="max-w-xs" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l) => (
              <Card key={l.id} hover className="transition-colors hover:border-strong">
                <CardContent className="p-0">
                <Link href={`/dashboard/lecturers/${l.id}`} className="block p-5">
                  <div className="flex items-start gap-3">
                    <Avatar src={l.avatar} name={l.name} size="lg" ring />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-fg-primary text-sm">{l.name}</h3>
                      <p className="text-xs text-fg-tertiary">{l.title}</p>
                      <Badge size="sm" variant="brand" className="mt-2">{l.department}</Badge>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-fg-secondary">Specialty: {l.specialty}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-subtle pt-3 text-xs"><span className="text-fg-secondary">{l.coursesCount} courses</span><span className="inline-flex items-center gap-1 text-[var(--color-gold-700)] font-semibold"><Star className="h-3.5 w-3.5 fill-current" />{l.rating.toFixed(1)}</span></div>
                </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
