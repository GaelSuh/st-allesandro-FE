import type { Invoice, Payment } from "@/types";
import { students } from "./people";

const today = new Date();
const daysAgo = (n: number) => new Date(today.getTime() - n * 86_400_000).toISOString();
const daysFromNow = (n: number) => new Date(today.getTime() + n * 86_400_000).toISOString();

function invoiceFor(
  i: number,
  studentName: string,
  matricule: string,
  studentId: string,
  base: number,
  paidPct: number
): Invoice {
  const amount = base;
  const paid = Math.floor(amount * paidPct);
  const balance = amount - paid;
  return {
    id: `inv_${i.toString().padStart(4, "0")}`,
    invoiceNumber: `SAUI-INV-${(2026000 + i).toString()}`,
    studentId,
    studentName,
    matricule,
    description: "Tuition · Semester 1, 2025/26",
    amount,
    paid,
    balance,
    dueDate: daysFromNow(14 - i * 3),
    status: balance === 0 ? "paid" : paid === 0 ? (i % 4 === 0 ? "overdue" : "pending") : "partial",
    items: [
      { label: "Tuition fee", amount: Math.floor(base * 0.78) },
      { label: "Clinical attachment", amount: Math.floor(base * 0.12) },
      { label: "Library & ICT", amount: Math.floor(base * 0.05) },
      { label: "Health insurance", amount: Math.floor(base * 0.05) },
    ],
    issuedAt: daysAgo(30 - i),
  };
}

export const invoices: Invoice[] = students.slice(0, 24).map((s, i) =>
  invoiceFor(i, s.name, s.matricule, s.id, 850_000, [0.4, 1, 0, 0.65, 0.2, 1, 0.85, 0, 1, 0.3][i % 10])
);

export const recentPayments: Payment[] = [
  { id: "pay_001", reference: "MOMO-7XR-9012", studentId: students[0].id, studentName: students[0].name, amount: 250_000, method: "mtn_momo", status: "successful", createdAt: daysAgo(0), invoiceId: invoices[0].id },
  { id: "pay_002", reference: "ORG-44P-2218", studentId: students[3].id, studentName: students[3].name, amount: 425_000, method: "orange_money", status: "successful", createdAt: daysAgo(1), invoiceId: invoices[3].id },
  { id: "pay_003", reference: "BNK-2025-001", studentId: students[1].id, studentName: students[1].name, amount: 850_000, method: "bank_transfer", status: "successful", createdAt: daysAgo(2), invoiceId: invoices[1].id },
  { id: "pay_004", reference: "VISA-8***1432", studentId: students[6].id, studentName: students[6].name, amount: 720_000, method: "card", status: "successful", createdAt: daysAgo(2) },
  { id: "pay_005", reference: "MOMO-7XR-9876", studentId: students[5].id, studentName: students[5].name, amount: 175_000, method: "mtn_momo", status: "pending", createdAt: daysAgo(3) },
  { id: "pay_006", reference: "ORG-44P-1190", studentId: students[8].id, studentName: students[8].name, amount: 90_000, method: "orange_money", status: "failed", createdAt: daysAgo(4) },
  { id: "pay_007", reference: "MOMO-7XR-3320", studentId: students[2].id, studentName: students[2].name, amount: 340_000, method: "mtn_momo", status: "successful", createdAt: daysAgo(5) },
];

export const financeKPIs = {
  collectedThisMonth: 48_750_000,
  outstandingTotal: 23_400_000,
  invoicesIssued: 412,
  collectionRate: 67.4,
  monthlyTrend: [
    { month: "Apr", collected: 32, outstanding: 18 },
    { month: "May", collected: 38, outstanding: 21 },
    { month: "Jun", collected: 41, outstanding: 22 },
    { month: "Jul", collected: 29, outstanding: 27 },
    { month: "Aug", collected: 35, outstanding: 24 },
    { month: "Sep", collected: 52, outstanding: 26 },
    { month: "Oct", collected: 49, outstanding: 23 },
  ],
};
