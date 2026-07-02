"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { STATS } from "@/lib/brand";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let frame: number;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="relative -mt-px border-y border-default bg-surface-elevated">
      <Container className="py-12 sm:py-16">
        <dl className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="text-center sm:text-left"
            >
              <dd className="font-display text-4xl font-semibold tracking-tight text-fg-primary sm:text-5xl">
                <CountUp to={s.value} suffix={"suffix" in s ? s.suffix : ""} />
              </dd>
              <dt className="mt-2 text-sm text-fg-secondary">{s.label}</dt>
            </motion.div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
