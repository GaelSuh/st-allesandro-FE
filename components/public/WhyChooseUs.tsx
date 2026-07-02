"use client";

import { motion } from "framer-motion";
import {
  Award,
  Building2,
  ClipboardCheck,
  GlobeLock,
  HeartHandshake,
  Microscope,
} from "lucide-react";
import { Section } from "@/components/ui/Container";

const features = [
  {
    Icon: HeartHandshake,
    title: "1,400+ clinical hours",
    body: "Real patient exposure from year one, across 38 partner hospitals — under licensed clinical supervisors with structured logbooks.",
  },
  {
    Icon: Award,
    title: "WHO-aligned curriculum",
    body: "Built on international competency frameworks and regularly reviewed by the Cameroon Nursing Council.",
  },
  {
    Icon: GlobeLock,
    title: "Italian orthopaedic heritage",
    body: "Mentored by the orthopaedic institutes of Bologna (Rizzoli & Galeazzi) through ORTHOPAEDICS ONLUS — ortopedici.org.",
  },
  {
    Icon: Microscope,
    title: "Simulation-first",
    body: "High-fidelity birthing, pediatric and adult manikins. OSCE-grade examination suites.",
  },
  {
    Icon: ClipboardCheck,
    title: "Digital practical logbook",
    body: "Procedures captured, signed and tracked in real time — competency progression is transparent for every learner.",
  },
  {
    Icon: Building2,
    title: "Modern facilities",
    body: "Lecture halls, library, ICT center, on-campus food-technology unit (Floven wines) and clinic on a single Bonaberi-Douala campus.",
  },
];

export function WhyChooseUs() {
  return (
    <Section
      eyebrow="Why St Alessandro"
      title="A modern institute built around real clinical mastery"
      description="Beyond the syllabus, we shape resilient practitioners who can lead in any health system — locally, regionally and internationally."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            className="rounded-2xl border border-default bg-surface-elevated p-6 shadow-soft transition-all hover:shadow-elevated"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-900)] text-[var(--color-gold-400)] shadow-soft">
              <f.Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-fg-primary">{f.title}</h3>
            <p className="mt-2 text-sm text-fg-secondary text-pretty">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
