"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const cells = [
  {
    title: "Graduation 2025",
    body: "Our largest cohort yet crosses the stage at the heart of Bonaberi-Douala.",
    img: "/img/9.jpg",
    tag: "Milestones",
    span: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Sports day",
    body: "Inter-faculty athletics alongside our visiting Italian staff.",
    img: "/img/12.jpg",
    tag: "Athletics",
    span: "",
  },
  {
    title: "BSc thesis defence",
    body: "Final-year students defend their research in Hall 1.",
    img: "/img/11.jpg",
    tag: "Academics",
    span: "",
  },
  {
    title: "Campus chaplaincy",
    body: "A blessing service with our student nurses — faith at the heart of campus.",
    img: "/img/16.jpg",
    tag: "Community",
    span: "",
  },
  {
    title: "The Promoter & staff",
    body: "The people who make St Alessandro a tight-knit community.",
    img: "/img/13.jpg",
    tag: "Our people",
    span: "",
  },
];

export function CampusLife() {
  return (
    <Section
      eyebrow="Campus life"
      title="A vibrant home for ambitious learners"
      description="Beyond lectures and ward rounds — clubs, exchanges, performing arts and the lifelong friendships of a tight-knit campus community."
    >
      <div className="grid auto-rows-[200px] sm:auto-rows-[240px] grid-cols-2 lg:grid-cols-4 gap-4">
        {cells.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`group relative overflow-hidden rounded-2xl border border-default bg-surface-sunken shadow-soft ${c.span}`}
          >
            <Image
              src={c.img}
              alt={c.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-950)]/85 via-[var(--color-brand-950)]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <Badge variant="solid" size="sm">
                {c.tag}
              </Badge>
              <h3 className="mt-2 font-display text-base font-semibold leading-snug">{c.title}</h3>
              <p className="mt-1 text-xs text-white/80 line-clamp-2">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/student-life"
          className="text-sm font-semibold text-[var(--color-brand-700)] hover:underline"
        >
          Explore student life →
        </Link>
      </div>
    </Section>
  );
}
