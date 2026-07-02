"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, HeartPulse, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AvatarGroup } from "@/components/ui/Avatar";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-radial-brand">
      <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[40rem] w-[80rem] rounded-full bg-gradient-radial from-[var(--color-gold-200)]/40 via-transparent to-transparent blur-3xl" />

      <Container className="relative pt-8 pb-24 sm:pt-10 sm:pb-32 lg:pt-14 lg:pb-40">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-default bg-surface-elevated px-3.5 py-1.5 text-xs font-medium text-fg-secondary shadow-soft"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-gold-600)]" />
              <span>2026/27 admissions are now open</span>
              <Link
                href="/apply"
                className="ml-1 inline-flex items-center gap-0.5 text-[var(--color-brand-700)] hover:underline"
              >
                Apply <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 font-display text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[1.04] tracking-tight text-fg-primary text-balance"
            >
              Empowering minds.{" "}
              <span className="gradient-text-gold italic">Inspiring</span>{" "}
              excellence in <span className="gradient-text-brand">nursing</span> &
              health sciences.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mx-auto lg:mx-0 mt-6 max-w-xl text-lg leading-relaxed text-fg-secondary text-pretty"
            >
              A distinctive Anglo-Saxon university institute in Bonaberi-Douala —
              training registered nurses, midwives, allied health and food-science
              professionals through evidence-based curricula and world-class Italian
              clinical partnerships. Open since October 2022.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:items-center lg:items-start lg:justify-start justify-center"
            >
              <Button asChild size="xl" variant="primary" className="w-full sm:w-auto">
                <Link href="/apply">
                  Start your application <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="secondary" className="w-full sm:w-auto">
                <Link href="/programs">Explore programs</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col items-center gap-3 lg:items-start sm:flex-row sm:gap-5"
            >
              <AvatarGroup
                members={[
                  { name: "Aïcha F.", src: "https://api.dicebear.com/9.x/lorelei/svg?seed=Aicha" },
                  { name: "Boris E.", src: "https://api.dicebear.com/9.x/lorelei/svg?seed=Boris" },
                  { name: "Linda T.", src: "https://api.dicebear.com/9.x/lorelei/svg?seed=Linda" },
                  { name: "Steve A.", src: "https://api.dicebear.com/9.x/lorelei/svg?seed=Steve" },
                  { name: "+", src: "" },
                ]}
                max={4}
                size="sm"
              />
              <div className="text-sm text-fg-secondary text-center lg:text-left">
                Trusted by <span className="font-semibold text-fg-primary">2,400+ students</span>{" "}
                across <span className="font-semibold text-fg-primary">38 clinical partner</span> sites.
              </div>
            </motion.div>
          </div>

          {/* Right — stacked visual cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mx-auto h-[520px] w-full max-w-lg sm:h-[580px] lg:h-[640px] lg:max-w-none"
          >
            <HeroCards />
          </motion.div>
        </div>
      </Container>

      {/* Logo strip */}
      <div className="relative border-y border-default bg-surface-elevated/60 backdrop-blur-sm">
        <Container className="py-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-tertiary">
              Accredited & in partnership with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-80">
              {[
                "Ministry of Higher Education",
                "Cameroon Nursing Council",
                "WHO · Africa Region",
                "Rizzoli Institute · Bologna",
                "Italian Cultural Exchange",
              ].map((name) => (
                <span
                  key={name}
                  className="text-xs sm:text-sm font-medium text-fg-secondary"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function HeroCards() {
  return (
    <div className="relative h-full">
      {/* Backdrop image card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute inset-0 overflow-hidden rounded-3xl border border-default bg-surface-elevated shadow-lifted"
      >
        <div className="relative h-full w-full">
          <Image
            src="/campus/hero-1.jpg"
            alt="St Alessandro University Institute campus, Bonaberi-Douala"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.30_0.105_258)]/70 via-[oklch(0.17_0.055_262)]/55 to-[oklch(0.11_0.035_264)]/75" />
          <div className="absolute inset-0 bg-noise opacity-40" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-brand-950)] to-transparent" />
          {/* Decorative shield/medical icon */}
          <svg viewBox="0 0 400 400" className="absolute -right-12 -top-12 h-72 w-72 opacity-20" aria-hidden>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="oklch(0.85 0.13 80)" />
                <stop offset="1" stopColor="oklch(0.58 0.130 75)" />
              </linearGradient>
            </defs>
            <path d="M200 30 L350 80 V200 C350 290 285 360 200 380 C115 360 50 290 50 200 V80 Z" fill="none" stroke="url(#g)" strokeWidth="2" />
            <path d="M200 120 V300 M120 210 H280" stroke="url(#g)" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-300)]">
              Class of 2025
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
              "Where compassionate practice meets clinical mastery."
            </h3>
            <p className="mt-3 text-sm text-white/70">— Prof. Marie-Claire Tchouani, Dean</p>
          </div>
        </div>
      </motion.div>

      {/* Floating stat card — top-right */}
      <motion.div
        initial={{ y: -10, x: 14, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute -top-4 -right-4 sm:-right-6 w-56 rounded-2xl border border-default bg-surface-elevated p-4 shadow-lifted backdrop-blur"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)]">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-fg-tertiary">Clinical hours</div>
            <div className="font-display text-2xl font-semibold tracking-tight">1,420+</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(0.96_0.05_155)] px-2 py-0.5 text-[oklch(0.36_0.13_155)] font-medium">
            ↑ 12%
          </span>
          <span className="text-fg-tertiary">vs last cohort</span>
        </div>
      </motion.div>

      {/* Floating program card — bottom-left */}
      <motion.div
        initial={{ y: 10, x: -14, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="absolute -bottom-4 -left-4 sm:-left-8 w-64 rounded-2xl border border-default bg-surface-elevated p-4 shadow-lifted"
      >
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-gold-50)] text-[var(--color-gold-700)]">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-wider text-fg-tertiary">Flagship program</div>
            <div className="mt-0.5 font-semibold text-fg-primary">B.Sc. Nursing</div>
            <div className="mt-1 text-xs text-fg-secondary">4 years · 162 credits · WHO-aligned</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-surface-sunken p-2 text-xs">
          <span className="text-fg-secondary">Intake</span>
          <span className="font-semibold text-fg-primary">120 seats</span>
        </div>
      </motion.div>
    </div>
  );
}
