"use client";

import { Bed, Building2, Users } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatTile } from "@/components/ui/StatTile";

const hostels = [
  { name: "St Caterina (Female)", capacity: 180, occupied: 162, blocks: 4, fee: 220_000 },
  { name: "San Marco (Female)", capacity: 120, occupied: 116, blocks: 3, fee: 220_000 },
  { name: "Don Bosco (Male)", capacity: 140, occupied: 108, blocks: 4, fee: 220_000 },
  { name: "International Wing", capacity: 60, occupied: 38, blocks: 2, fee: 320_000 },
];

export default function AdminHostelsPage() {
  const totalCap = hostels.reduce((a, h) => a + h.capacity, 0);
  const totalOcc = hostels.reduce((a, h) => a + h.occupied, 0);

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Campus" title="Hostel management" description="On-campus accommodation occupancy, requests and fees." />
      <div className="grid gap-4 sm:grid-cols-4">
        <StatTile label="Total beds" value={totalCap} accent="brand" />
        <StatTile label="Occupied" value={totalOcc} accent="clinical" />
        <StatTile label="Vacant" value={totalCap - totalOcc} accent="gold" />
        <StatTile label="Occupancy" value={`${Math.round(totalOcc / totalCap * 100)}%`} accent="brand" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {hostels.map((h) => {
          const pct = Math.round(h.occupied / h.capacity * 100);
          return (
            <Card key={h.name} hover>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"><Building2 className="h-5 w-5" /></div><div><h3 className="font-semibold text-fg-primary">{h.name}</h3><div className="text-xs text-fg-tertiary">{h.blocks} blocks · {h.capacity} beds</div></div></div>
                  <Badge size="sm" variant={pct > 90 ? "danger" : pct > 70 ? "gold" : "success"}>{pct}% full</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs"><span className="text-fg-tertiary inline-flex items-center gap-1"><Bed className="h-3 w-3" />Occupancy</span><span className="font-mono font-semibold text-fg-primary">{h.occupied}/{h.capacity}</span></div>
                  <Progress value={pct} className="mt-1.5" />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-subtle pt-3 text-xs"><span className="text-fg-tertiary">Per semester</span><span className="font-semibold text-fg-primary">{new Intl.NumberFormat().format(h.fee)} FCFA</span></div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
