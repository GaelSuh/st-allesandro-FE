"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Users } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

interface Slot {
  day: number;
  startH: number;
  durationH: number;
  code: string;
  title: string;
  room: string;
  lecturer: string;
  accent: "brand" | "clinical" | "gold";
}

const schedule: Slot[] = [
  { day: 0, startH: 0, durationH: 2, code: "NUR-305", title: "Med-Surg I", room: "Hall A2", lecturer: "Mr. J. Bisseck", accent: "brand" },
  { day: 0, startH: 5, durationH: 2, code: "NUR-303", title: "Ethics & Law", room: "Hall B", lecturer: "Dr. L. Ngono", accent: "gold" },
  { day: 1, startH: 2, durationH: 2, code: "NUR-204", title: "Pharmacology", room: "Hall C", lecturer: "Dr. E. Mbarga", accent: "clinical" },
  { day: 1, startH: 6, durationH: 3, code: "Clinic", title: "Maternity rotation", room: "Laquintinie", lecturer: "Dr. F. Mbongo", accent: "clinical" },
  { day: 2, startH: 0, durationH: 4, code: "NUR-307", title: "OB-GYN Nursing", room: "Sim Lab 1", lecturer: "Mme. S. Owono", accent: "brand" },
  { day: 2, startH: 5, durationH: 2, code: "NUR-303", title: "Ethics & Law", room: "Hall B", lecturer: "Dr. L. Ngono", accent: "gold" },
  { day: 3, startH: 2, durationH: 2, code: "NUR-204", title: "Pharmacology", room: "Hall C", lecturer: "Dr. E. Mbarga", accent: "clinical" },
  { day: 3, startH: 6, durationH: 3, code: "Clinic", title: "Maternity rotation", room: "Laquintinie", lecturer: "Dr. F. Mbongo", accent: "clinical" },
  { day: 4, startH: 0, durationH: 2, code: "NUR-305", title: "Med-Surg I", room: "Hall A2", lecturer: "Mr. J. Bisseck", accent: "brand" },
  { day: 4, startH: 1, durationH: 2, code: "NUR-303", title: "Ethics & Law", room: "Hall B", lecturer: "Dr. L. Ngono", accent: "gold" },
  { day: 5, startH: 1, durationH: 4, code: "Clinic", title: "Skills lab", room: "Sim Lab 2", lecturer: "Mr. J. Bisseck", accent: "clinical" },
];

const colorMap = {
  brand: "bg-[var(--color-brand-50)] border-[var(--color-brand-300)] text-[var(--color-brand-800)]",
  clinical: "bg-[var(--color-clinical-50)] border-[var(--color-clinical-300)] text-[var(--color-clinical-800)]",
  gold: "bg-[var(--color-gold-50)] border-[var(--color-gold-300)] text-[var(--color-gold-800)]",
};

export default function StudentTimetablePage() {
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Schedule"
        title="My weekly timetable"
        description="Lectures, simulation labs and clinical rotations — week of 27 May 2026."
        actions={
          <div className="flex items-center gap-1 rounded-xl border border-default bg-surface-elevated p-1">
            <Button variant="ghost" size="icon-sm" onClick={() => setWeekOffset((w) => w - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            <span className="px-2 text-sm font-medium text-fg-primary">Week of {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
            <Button variant="ghost" size="icon-sm" onClick={() => setWeekOffset((w) => w + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <div className="min-w-[820px]">
            <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-default sticky top-0 bg-surface-elevated z-10">
              <div className="px-3 py-3 text-[10px] font-semibold uppercase tracking-wider text-fg-tertiary">Time</div>
              {days.map((d, i) => (
                <div key={d} className="px-3 py-3 text-center text-xs font-semibold text-fg-primary">
                  {d}
                  <div className="text-[10px] font-normal text-fg-tertiary">{27 + i} May</div>
                </div>
              ))}
            </div>
            <div className="relative grid grid-cols-[80px_repeat(6,1fr)]">
              {hours.map((h, hi) => (
                <div key={h} className="contents">
                  <div className="border-r border-b border-subtle px-3 py-3 text-[10px] font-mono text-fg-tertiary">{h}</div>
                  {days.map((_, di) => (
                    <div key={di} className="relative h-14 border-r border-b border-subtle">
                      {schedule
                        .filter((s) => s.day === di && s.startH === hi)
                        .map((s) => (
                          <div
                            key={`${s.day}-${s.startH}-${s.code}`}
                            className={cn(
                              "absolute inset-x-1 top-1 rounded-md border px-2 py-1.5 text-[11px] shadow-soft transition-transform hover:-translate-y-0.5",
                              colorMap[s.accent]
                            )}
                            style={{ height: `calc(${s.durationH * 3.5}rem - 0.5rem)` }}
                          >
                            <div className="font-mono text-[9px] opacity-70">{s.code}</div>
                            <div className="mt-0.5 font-semibold leading-tight">{s.title}</div>
                            <div className="mt-1 inline-flex items-center gap-1 text-[9px] opacity-80"><MapPin className="h-2.5 w-2.5" />{s.room}</div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3 text-sm">
          <Badge variant="brand" dot>Lecture</Badge>
          <Badge variant="clinical" dot>Clinical / Simulation</Badge>
          <Badge variant="gold" dot>Seminar</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
