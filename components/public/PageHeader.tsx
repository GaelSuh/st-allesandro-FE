"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: Crumb[];
  align?: "left" | "center";
  actions?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, breadcrumbs, align = "left", actions }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-default bg-radial-brand">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_0%,transparent_70%)]" />
      <Container className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
        {breadcrumbs && (
          <nav className={`mb-6 flex flex-wrap items-center gap-1.5 text-xs ${align === "center" ? "justify-center" : ""}`}>
            {breadcrumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-fg-tertiary">
                {c.href ? (
                  <Link href={c.href} className="hover:text-fg-primary">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-fg-secondary">{c.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-default bg-surface-elevated px-3 py-1 text-xs font-medium tracking-wide text-[var(--color-brand-700)] shadow-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-500)]" />
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-semibold tracking-tight text-fg-primary sm:text-5xl lg:text-6xl text-balance"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-fg-secondary sm:text-lg text-pretty"
            >
              {description}
            </motion.p>
          )}
          {actions && <div className="mt-7 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      </Container>
    </section>
  );
}
