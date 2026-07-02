import type { Metadata } from "next";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Use — St Alessandro University Institute",
  description: "The terms governing your use of the St Alessandro University Institute website.",
};

const sections = [
  {
    h: "Acceptance of terms",
    p: `By accessing this website you agree to these terms. If you do not agree, please discontinue use of the site.`,
  },
  {
    h: "Use of the website",
    p: "You may use the site for lawful, personal and informational purposes. You agree not to misuse the site, attempt unauthorised access, or disrupt its operation.",
  },
  {
    h: "Admissions & information accuracy",
    p: "Programme details, fees, dates and requirements are provided for guidance and may change. Official admission decisions and figures are confirmed in writing by our admissions office.",
  },
  {
    h: "Intellectual property",
    p: `All content, branding and imagery on this site are the property of ${BRAND.name} or its partners and may not be reproduced without permission.`,
  },
  {
    h: "Limitation of liability",
    p: "The site is provided on an “as is” basis. We are not liable for indirect or consequential losses arising from use of the site, to the fullest extent permitted by law.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
        title="Terms of Use"
        description="The terms that govern your use of this website."
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
              Questions about these terms? Contact us at{" "}
              <a href={`mailto:${BRAND.contact.email}`} className="font-semibold text-[var(--color-brand-700)] break-all">
                {BRAND.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
