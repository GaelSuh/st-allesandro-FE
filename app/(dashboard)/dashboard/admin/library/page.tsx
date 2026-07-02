"use client";

import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

const books = [
  { isbn: "978-1234567890", title: "Brunner & Suddarth's Med-Surg Nursing", category: "Med-Surg", total: 20, available: 12, borrowed: 8 },
  { isbn: "978-2345678901", title: "Williams Obstetrics", category: "OB-GYN", total: 12, available: 5, borrowed: 7 },
  { isbn: "978-3456789012", title: "Pharmacology for Nurses", category: "Pharmacology", total: 14, available: 0, borrowed: 14 },
  { isbn: "978-4567890123", title: "Fundamentals of Nursing — Potter & Perry", category: "Foundations", total: 18, available: 8, borrowed: 10 },
];

export default function AdminLibraryPage() {
  const [q, setQ] = useState("");
  const totals = books.reduce((acc, b) => ({ titles: acc.titles + 1, copies: acc.copies + b.total, out: acc.out + b.borrowed }), { titles: 0, copies: 0, out: 0 });

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Resources" title="Library administration" description="Catalog, loans and overdue management." actions={<Button leftIcon={<Plus className="h-4 w-4" />}>Add title</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Unique titles" value={totals.titles} accent="brand" />
        <StatTile label="Total copies" value={totals.copies} accent="clinical" />
        <StatTile label="On loan" value={totals.out} accent="gold" />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Catalog</CardTitle>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" leftIcon={<Search className="h-4 w-4" />} className="max-w-xs" />
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle"><th className="pb-3">Title</th><th className="pb-3">ISBN</th><th className="pb-3">Category</th><th className="pb-3">Total</th><th className="pb-3">Avail.</th><th className="pb-3">On loan</th></tr></thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {books.filter(b => !q || `${b.title} ${b.isbn} ${b.category}`.toLowerCase().includes(q.toLowerCase())).map((b) => (
                <tr key={b.isbn}>
                  <td className="py-3 font-medium text-fg-primary">{b.title}</td>
                  <td className="py-3 font-mono text-xs text-fg-tertiary">{b.isbn}</td>
                  <td className="py-3"><Badge size="sm" variant="brand">{b.category}</Badge></td>
                  <td className="py-3">{b.total}</td>
                  <td className="py-3 font-semibold text-fg-primary">{b.available}</td>
                  <td className="py-3">{b.borrowed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
