"use client";

import { useState } from "react";
import { BookOpen, Bookmark, ExternalLink, Search } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

const books = [
  { title: "Brunner & Suddarth's Textbook of Medical-Surgical Nursing", author: "Hinkle & Cheever", category: "Med-Surg", available: 12, total: 20 },
  { title: "Williams Obstetrics", author: "Cunningham et al.", category: "OB-GYN", available: 5, total: 12 },
  { title: "Pharmacology for Nurses", author: "Adams & Holland", category: "Pharmacology", available: 0, total: 14 },
  { title: "Fundamentals of Nursing", author: "Potter & Perry", category: "Foundations", available: 8, total: 18 },
  { title: "Maternal & Child Nursing Care", author: "London et al.", category: "Maternal", available: 6, total: 10 },
  { title: "Anatomy & Physiology for Nurses", author: "Peate & Nair", category: "Anatomy", available: 9, total: 16 },
];

const borrowed = [
  { title: "Brunner & Suddarth's Textbook of Med-Surg Nursing", dueIn: 2, overdue: true },
  { title: "Williams Obstetrics", dueIn: 8, overdue: false },
];

export default function StudentLibraryPage() {
  const [q, setQ] = useState("");
  const filtered = books.filter((b) => !q || `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Resources" title="Library" description="Search the catalog, manage holds, and renew borrowed books." />
      <Tabs defaultValue="catalog">
        <TabsList><TabsTrigger value="catalog">Catalog</TabsTrigger><TabsTrigger value="borrowed">My loans ({borrowed.length})</TabsTrigger><TabsTrigger value="ebooks">E-resources</TabsTrigger></TabsList>
        <TabsContent value="catalog">
          <div className="mb-4 max-w-md"><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the catalog…" leftIcon={<Search className="h-4 w-4" />} /></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b, i) => (
              <Card key={i} hover>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-20 w-14 rounded-md bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-900)] grid place-items-center text-white shadow-soft">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-fg-primary line-clamp-2">{b.title}</h3>
                      <p className="text-xs text-fg-tertiary">{b.author}</p>
                      <Badge size="sm" variant="brand" className="mt-2">{b.category}</Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-subtle pt-3 text-xs">
                    <span className={b.available === 0 ? "text-[oklch(0.55_0.205_25)] font-semibold" : "text-fg-secondary"}>{b.available}/{b.total} available</span>
                    <Button size="xs" variant={b.available > 0 ? "primary" : "secondary"} disabled={b.available === 0}>{b.available > 0 ? "Borrow" : "Reserve"}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="borrowed">
          <div className="space-y-3">
            {borrowed.map((b, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3"><Bookmark className="h-5 w-5 text-[var(--color-brand-700)]" /><div><div className="text-sm font-semibold text-fg-primary">{b.title}</div><div className="text-xs text-fg-tertiary">{b.overdue ? `Overdue by ${b.dueIn} days` : `Due in ${b.dueIn} days`}</div></div></div>
                  <Button size="sm" variant={b.overdue ? "danger" : "secondary"}>Renew</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ebooks">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {["PubMed Central", "Cochrane Library", "UpToDate Nursing", "JSTOR Health"].map((r) => (
                  <a key={r} href="#" className="flex items-center justify-between rounded-xl border border-subtle p-4 hover:bg-surface-sunken">
                    <div className="font-semibold text-fg-primary">{r}</div><ExternalLink className="h-4 w-4 text-fg-tertiary" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
