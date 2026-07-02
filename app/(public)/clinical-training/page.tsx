import Link from "next/link";
import { PageHeader } from "@/components/public/PageHeader";
import { Section, Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Building2, ClipboardCheck, HeartPulse, Hospital, MapPin, Microscope, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { hospitals } from "@/data/clinical";
import { CampusPhotoGrid } from "@/components/public/CampusPhotoGrid";
import { photosByIndex } from "@/data/gallery";

const features = [
  { Icon: Stethoscope, title: "Structured rotations", body: "12 specialty rotations spanning maternity, pediatrics, ICU, med-surg, oncology, emergency and community health." },
  { Icon: ClipboardCheck, title: "Digital practical logbook", body: "Every procedure logged, witnessed and signed — competency progression is transparent for the student, supervisor and faculty." },
  { Icon: Microscope, title: "Simulation-first", body: "High-fidelity labs ensure students practice and refine before any real patient encounter." },
  { Icon: ShieldCheck, title: "Safety & ethics", body: "Universal precautions, patient consent and reflective debrief embedded into every rotation block." },
];

export default function ClinicalTrainingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clinical training"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Clinical Training" }]}
        title="1,400+ hours of supervised, real clinical practice."
        description="Our clinical model is the heart of an SAUI education — pairing rigorous classroom theory with hospital-based mastery from year one."
        actions={
          <>
            <Button asChild size="lg" variant="primary"><Link href="/apply">Apply now</Link></Button>
            <Button asChild size="lg" variant="secondary"><Link href="/programs">View nursing programs</Link></Button>
          </>
        }
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} hover className="p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-clinical-500)] to-[var(--color-clinical-700)] text-white shadow-soft">
                <f.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-fg-primary">{f.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary text-pretty">{f.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Inside the clinic"
        title="Italian-mentored orthopaedic & surgical care"
        description="St Alessandro Clinic is our flagship training site — visiting Italian orthopaedic teams operate and teach on campus twice a year, supported by a modern imaging suite and intra-operative fluoroscopy."
        align="left"
        className="bg-surface-elevated/40"
      >
        <CampusPhotoGrid
          photos={photosByIndex(6, 15, 20, 18, 7, 3)}
          showCategory={false}
        />
      </Section>

      <Section
        eyebrow="Our hospital network"
        title="38 clinical partners across the country"
        description="From teaching hospitals to district facilities — our students gain exposure across the full spectrum of care contexts."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((h) => (
            <Card key={h.id} hover>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)]">
                    <Hospital className="h-5 w-5" />
                  </div>
                  <Badge variant="clinical" size="sm">{h.type}</Badge>
                </div>
                <h3 className="mt-4 font-semibold text-fg-primary">{h.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-fg-tertiary"><MapPin className="h-3 w-3" /> {h.address}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {h.wards.slice(0, 4).map((w) => (
                    <span key={w} className="rounded-md bg-surface-sunken px-2 py-0.5 text-[11px] text-fg-secondary">{w}</span>
                  ))}
                  {h.wards.length > 4 && <span className="rounded-md bg-surface-sunken px-2 py-0.5 text-[11px] text-fg-tertiary">+{h.wards.length - 4}</span>}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-subtle pt-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-fg-secondary"><Users className="h-3 w-3" /> {h.capacity} beds</span>
                  <span className="inline-flex items-center gap-1 text-[var(--color-gold-700)] font-semibold">★ {h.rating}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
