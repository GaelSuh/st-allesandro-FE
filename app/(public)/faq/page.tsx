"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { faqs } from "@/data/notifications";
import { cn } from "@/lib/utils";

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <>
      <PageHeader
        eyebrow="Frequently asked questions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        title="Quick answers to the questions we hear most."
        description="Still have a question? Our admissions team is one phone call (or WhatsApp message) away."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={i} className={cn("overflow-hidden rounded-2xl border bg-surface-elevated transition-all", open ? "border-[var(--color-brand-300)] shadow-elevated" : "border-default shadow-soft")}>
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-ring"
                >
                  <span className="text-base font-semibold text-fg-primary">{f.q}</span>
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-fg-tertiary transition-transform", open && "rotate-180 text-[var(--color-brand-600)]")} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-sm leading-relaxed text-fg-secondary text-pretty">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
