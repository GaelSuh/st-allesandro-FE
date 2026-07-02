"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-default bg-[var(--color-brand-950)] text-white shadow-lifted">
          <div className="absolute inset-0 bg-noise opacity-40" />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-gold-500)] opacity-20 blur-3xl" />
          <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-[var(--color-brand-500)] opacity-30 blur-3xl" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:p-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--color-gold-300)] backdrop-blur">
                <CalendarDays className="h-3.5 w-3.5" />
                Next intake closes 30 August 2026
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl text-balance">
                Your seat in the next generation of caregivers awaits.
              </h2>
              <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg text-pretty">
                Apply in under 15 minutes. Get matched with a program advisor within 48 hours.
                Scholarships available for outstanding candidates.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="xl" variant="gold">
                  <Link href="/apply">
                    Apply now <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="ghost" className="text-white border border-white/20 hover:bg-white/10">
                  <Link href="/contact">Book a campus tour</Link>
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-300)]">
                  Quick facts
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  {[
                    ["Annual tuition", "from 330,000 FCFA"],
                    ["Programs offered", "Medical sciences & food science"],
                    ["Clinical partners", "St Alessandro Clinic & partners"],
                    ["Italian mentorship", "Bologna · Rizzoli Institute"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <dt className="text-white/70">{k}</dt>
                      <dd className="font-semibold text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
