import type { Metadata } from "next";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy — St Alessandro University Institute",
  description: "How St Alessandro University Institute collects, uses and protects your personal data.",
};

const sections = [
  {
    h: "Information we collect",
    p: "When you apply, enquire or contact us, we collect the details you provide — name, contact information, academic history and any supporting documents. We also collect limited technical data (such as browser type and pages visited) to operate and improve the website.",
  },
  {
    h: "How we use your information",
    p: "We use your data to process applications, respond to enquiries, deliver academic and clinical services, and communicate about admissions, scholarships and events. We do not sell your personal data to third parties.",
  },
  {
    h: "Sharing & disclosure",
    p: "We share data only where necessary — with our accreditation and mentorship partners, clinical placement sites, and where required by law. Any partner handling your data is bound to protect it.",
  },
  {
    h: "Data retention & security",
    p: "We keep personal data only as long as needed for the purposes above or as required by regulation, and protect it with appropriate technical and organisational safeguards.",
  },
  {
    h: "Your rights",
    p: "You may request access to, correction of, or deletion of your personal data, and may withdraw consent for non-essential communications at any time.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        title="Privacy Policy"
        description="Your trust matters. This policy explains what we collect and how we protect it."
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
              Questions about your data? Contact us at{" "}
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
