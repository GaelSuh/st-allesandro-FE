"use client";

import { create } from "zustand";
import type { Invoice, Payment } from "@/types";
import { invoices as seedInvoices, recentPayments as seedPayments } from "@/data/finance";

interface FinanceState {
  invoices: Invoice[];
  payments: Payment[];
  initiatePayment: (
    invoiceId: string,
    amount: number,
    method: Payment["method"]
  ) => Promise<{ ok: boolean; error?: string; payment?: Payment }>;
  refundPayment: (id: string) => void;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  invoices: seedInvoices,
  payments: seedPayments,
  initiatePayment: async (invoiceId, amount, method) => {
    // 1.4s simulated network
    await new Promise((r) => setTimeout(r, 1400));

    // Random failure for "card" so we can showcase error UX
    if (method === "card" && Math.random() < 0.18) {
      return {
        ok: false,
        error: "Your bank declined the transaction. Please verify the card details and your available limit, then try again.",
      };
    }
    if (method === "mtn_momo" && amount > 1_500_000) {
      return {
        ok: false,
        error: "MTN MoMo daily limit (1,500,000 FCFA) reached. Please split the payment or use Bank transfer.",
      };
    }

    const payment: Payment = {
      id: `pay_${Date.now()}`,
      reference:
        method === "mtn_momo"
          ? `MOMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
          : method === "orange_money"
          ? `ORG-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
          : method === "bank_transfer"
          ? `BNK-${Date.now().toString().slice(-7)}`
          : `VISA-${Math.random().toString().slice(2, 8)}`,
      studentId: "stu_me",
      studentName: "Yolande Mvondo",
      amount,
      method,
      status: "successful",
      createdAt: new Date().toISOString(),
      invoiceId,
    };

    set((s) => {
      const next = s.invoices.map((inv) => {
        if (inv.id !== invoiceId) return inv;
        const paid = inv.paid + amount;
        const balance = Math.max(0, inv.amount - paid);
        return {
          ...inv,
          paid,
          balance,
          status: (balance === 0 ? "paid" : "partial") as Invoice["status"],
        };
      });
      return { invoices: next, payments: [payment, ...s.payments] };
    });

    return { ok: true, payment };
  },
  refundPayment: (id) =>
    set((s) => ({
      payments: s.payments.map((p) => (p.id === id ? { ...p, status: "failed" } : p)),
    })),
}));
