"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { news } from "@/data/notifications";
import { formatDate } from "@/lib/utils";

export function NewsTeaser() {
  const items = news.slice(0, 3);
  return (
    <Section
      eyebrow="News & stories"
      title="Inside the St Alessandro campus"
      description="Curriculum updates, partnerships, graduations and the moments that shape our community."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((n, i) => (
          <motion.article
            key={n.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-default bg-surface-elevated shadow-soft transition-shadow hover:shadow-elevated"
          >
            <Link href={`/news/${n.slug}`} className="relative aspect-[16/10] block bg-surface-sunken overflow-hidden">
              <Image
                src={n.cover}
                alt={n.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge variant="solid" className="absolute left-3 top-3">
                {n.category}
              </Badge>
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs text-fg-tertiary">{formatDate(n.publishedAt)} · {n.readingTime} min read</p>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-fg-primary line-clamp-2">
                <Link href={`/news/${n.slug}`} className="hover:underline">
                  {n.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-fg-secondary line-clamp-3 text-pretty">{n.excerpt}</p>
              <Link
                href={`/news/${n.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-700)] hover:gap-2 transition-all"
              >
                Read story <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
