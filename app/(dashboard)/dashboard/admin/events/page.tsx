"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { events } from "@/data/notifications";
import { formatDate, percent } from "@/lib/utils";

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Calendar" title="Event management" description="Open days, symposiums, workshops and sports events." actions={<Button leftIcon={<Plus className="h-4 w-4" />}>Create event</Button>} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <Card key={e.id} hover className="overflow-hidden">
            <div className="relative aspect-[16/9] bg-surface-sunken">
              {e.cover && <Image src={e.cover} alt={e.title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />}
              <Badge variant="solid" className="absolute left-3 top-3">{e.category}</Badge>
            </div>
            <CardContent className="p-5">
              <h3 className="font-display text-lg font-semibold leading-snug">{e.title}</h3>
              <p className="mt-1 text-xs text-fg-tertiary">{formatDate(e.date)} · {e.location}</p>
              <div className="mt-3 flex items-center justify-between text-xs"><span className="text-fg-secondary">{e.attendees}/{e.capacity} attendees</span><Badge size="sm" variant="brand">{percent(e.attendees, e.capacity)}% full</Badge></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
