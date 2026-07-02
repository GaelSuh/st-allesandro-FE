"use client";

import { useState } from "react";
import { Download, Filter, Search } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useFinanceStore } from "@/stores";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PaymentsPage() {
  const payments = useFinanceStore((s) => s.payments);
  const [q, setQ] = useState("");
  const [method, setMethod] = useState("all");
  const filtered = payments.filter((p) => {
    if (method !== "all" && p.method !== method) return false;
    if (q && !`${p.studentName} ${p.reference}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Bursary"
        title="Payments"
        description="Every transaction across MTN MoMo, Orange Money, bank and card. Reconciled in real time."
        actions={<Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>Export</Button>}
      />
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>{filtered.length} transactions</CardTitle><CardDescription>Total: {formatCurrency(filtered.reduce((a, p) => a + p.amount, 0))}</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search reference or student…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-64" />
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-40"><Filter className="h-3.5 w-3.5 mr-1 text-fg-tertiary" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All methods</SelectItem><SelectItem value="mtn_momo">MTN MoMo</SelectItem><SelectItem value="orange_money">Orange Money</SelectItem><SelectItem value="bank_transfer">Bank</SelectItem><SelectItem value="card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                <th className="pb-3">Reference</th><th className="pb-3">Student</th><th className="pb-3">Method</th><th className="pb-3">Amount</th><th className="pb-3">Date</th><th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 font-mono text-xs">{p.reference}</td>
                  <td className="py-3"><div className="flex items-center gap-2"><Avatar name={p.studentName} size="xs" /><span className="text-fg-primary">{p.studentName}</span></div></td>
                  <td className="py-3 text-fg-secondary">{p.method.replace("_", " ")}</td>
                  <td className="py-3 font-mono font-semibold text-fg-primary">{formatCurrency(p.amount)}</td>
                  <td className="py-3 text-xs text-fg-tertiary">{formatDate(p.createdAt)}</td>
                  <td className="py-3"><Badge size="sm" variant={p.status === "successful" ? "success" : p.status === "pending" ? "warning" : "danger"} dot>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
