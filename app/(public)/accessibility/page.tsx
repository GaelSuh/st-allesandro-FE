import type { Metadata } from "next";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Accessibility — St Alessandro University Institute",
  description: "Our commitment to an accessible, inclusive website for every visitor.",
};

const sections = [
  {
    h: "Our commitment",
    p: "St Alessandro University Institute is committed to ensuring our website is accessible to everyone, including people who use assistive technologies. We aim to meet the WCAG 2.1 AA standard.",
  },
  {
    h: "What we do",
    p: "We use semantic markup, sufficient colour contrast, keyboard-navigable controls, descriptive alternative text for images, and respect reduced-motion preferences for animations.",
  },
  {
    h: "Ongoing improvement",
    p: "Accessibility is an ongoing effort. We review the site regularly and welcome feedback that helps us improve the experience for all users.",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
        title="Accessibility Statement"
        description="An inclusive experience for every visitor and every ability."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-xl font-semibold text-fg-primary">{s.h}</h2>
              <p className="mt-2 text-fg-secondary text-pretty">{s.p}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-default bg-surface-elevated p-6 shadow-soft">
            <p className="text-sm text-fg-secondary">
              Found a barrier? Tell us at{" "}
              <a href={`mailto:${BRAND.contact.email}`} className="font-semibold text-[var(--color-brand-700)] break-all">
                {BRAND.contact.email}
              </a>{" "}
              and we&rsquo;ll address it.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
