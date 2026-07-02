"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { Avatar } from "@/components/ui/Avatar";
import { testimonials } from "@/data/notifications";

export function Testimonials() {
  return (
    <Section
      eyebrow="From our community"
      title="Stories from a community that practices what we teach"
      description="Alumni, faculty and clinical partners on what makes St Alessandro a defining chapter in their career."
      className="bg-gradient-to-b from-transparent via-[var(--color-brand-50)]/40 to-transparent"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="relative flex flex-col rounded-2xl border border-default bg-surface-elevated p-6 shadow-soft"
          >
            <Quote className="absolute right-5 top-5 h-8 w-8 text-[var(--color-gold-200)]" />
            <div className="flex items-center gap-0.5 text-[var(--color-gold-500)]">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-fg-primary text-pretty">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-subtle pt-4">
              <Avatar src={t.avatar} name={t.name} size="md" />
              <div>
                <div className="text-sm font-semibold text-fg-primary">{t.name}</div>
                <div className="text-xs text-fg-tertiary">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
