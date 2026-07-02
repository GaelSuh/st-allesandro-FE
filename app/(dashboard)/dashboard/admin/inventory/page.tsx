"use client";

import { Beaker, Box, Cpu, Plus, Search, Wrench } from "lucide-react";
import { useState } from "react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { StatTile } from "@/components/ui/StatTile";

const items = [
  { Icon: Beaker, name: "IV Cannula 18G", category: "Consumable", qty: 1240, threshold: 500, location: "Sim Lab 1", status: "ok" },
  { Icon: Beaker, name: "Suture pack 3-0", category: "Consumable", qty: 120, threshold: 200, location: "Sim Lab 1", status: "low" },
  { Icon: Cpu, name: "Adult patient simulator (high-fidelity)", category: "Equipment", qty: 4, threshold: 4, location: "Sim Lab 1", status: "ok" },
  { Icon: Cpu, name: "Pediatric simulator", category: "Equipment", qty: 2, threshold: 2, location: "Sim Lab 2", status: "ok" },
  { Icon: Wrench, name: "Stethoscope (Littmann Classic)", category: "Equipment", qty: 60, threshold: 80, location: "Skills lab", status: "low" },
  { Icon: Box, name: "Gloves (size M, box of 100)", category: "Consumable", qty: 84, threshold: 100, location: "Storeroom A", status: "low" },
  { Icon: Beaker, name: "Sterile dressing pack", category: "Consumable", qty: 420, threshold: 300, location: "Storeroom A", status: "ok" },
];

export default function InventoryPage() {
  const [q, setQ] = useState("");
  const lowStock = items.filter((i) => i.status === "low").length;

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Operations" title="Inventory & lab equipment" description="Real-time stock across simulation labs, skills labs and storerooms." actions={<Button leftIcon={<Plus className="h-4 w-4" />}>Add item</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="SKUs tracked" value={items.length} accent="brand" />
        <StatTile label="Low-stock alerts" value={lowStock} accent="gold" />
        <StatTile label="Locations" value="6" accent="clinical" />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All items</CardTitle>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search inventory…" leftIcon={<Search className="h-4 w-4" />} className="max-w-xs" />
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle"><th className="pb-3">Item</th><th className="pb-3">Category</th><th className="pb-3">Quantity</th><th className="pb-3">Threshold</th><th className="pb-3">Location</th><th className="pb-3">Status</th></tr></thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {items.filter(i => !q || i.name.toLowerCase().includes(q.toLowerCase())).map((it, i) => (
                <tr key={i}>
                  <td className="py-3"><div className="flex items-center gap-3"><div className="grid h-8 w-8 place-items-center rounded-lg bg-surface-sunken text-fg-secondary"><it.Icon className="h-4 w-4" /></div><span className="font-medium text-fg-primary">{it.name}</span></div></td>
                  <td className="py-3 text-fg-secondary">{it.category}</td>
                  <td className="py-3 font-mono font-semibold text-fg-primary">{it.qty}</td>
                  <td className="py-3 font-mono text-fg-tertiary">{it.threshold}</td>
                  <td className="py-3 text-fg-secondary">{it.location}</td>
                  <td className="py-3"><Badge size="sm" variant={it.status === "ok" ? "success" : "warning"} dot>{it.status === "ok" ? "in stock" : "low"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
