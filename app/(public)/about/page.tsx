import Image from "next/image";
import { PageHeader } from "@/components/public/PageHeader";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { CampusPhotoGrid } from "@/components/public/CampusPhotoGrid";
import { CREST_SRC, photosByIndex } from "@/data/gallery";
import { BRAND } from "@/lib/brand";
import {
  Award,
  Compass,
  Eye,
  Flag,
  HeartPulse,
  Sparkles,
} from "lucide-react";

const pillars = [
  { Icon: Flag, title: "Mission", body: "To inspire students to dream more, learn more, do more — and become more — through compassionate, evidence-based education." },
  { Icon: Eye, title: "Vision", body: "An African university institute renowned for shaping the leaders of health-system transformation across the continent and beyond." },
  { Icon: Compass, title: "Values", body: "Integrity, compassion, excellence, lifelong inquiry, and global citizenship — embedded in every classroom and clinical encounter." },
];

const milestones = [
  { year: "2021", text: "St Alessandro Clinic officially opens its doors on the 1st of December 2021 in Bonaberi-Douala." },
  { year: "2022", text: "St Alessandro University Institute (S.A.U) opens on the 17th of October 2022, founded in memory of Prof. Alessandro Faldini." },
  { year: "2022", text: "Partnership established with Italian orthopaedic institutions in Bologna through ORTHOPAEDICS ONLUS (ortopedici.org)." },
  { year: "2023", text: "Faculty of Medical Sciences launches HND & BSc programmes in nursing, midwifery, imaging, pharmacy and physiotherapy." },
  { year: "2023", text: "School of Agriculture & Food Science launches, including the Floven wines food-technology unit." },
  { year: "2024", text: "Masters programmes introduced, including MCh. Orthopaedic Surgery for MD/MBBS holders." },
  { year: "2024", text: "Mentorship partnerships deepened with University of Buea and GHC Hospital, India." },
];

const leadership = [
  { name: "Dr. Mutsu Venantius Bumaha", role: "Co-Founder & Director", initials: "MVB" },
  { name: "Dr. Florence Nsuh Mutsu", role: "Co-Founder", initials: "FNM" },
  { name: "Prof. Cesare Faldini", role: "Orthopaedic Partner, Bologna (Italy)", initials: "CF" },
  { name: "In memory of Prof. Alessandro Faldini", role: "Namesake & Inspiration", initials: "AF" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={<>A faculty rooted in heritage, built for tomorrow.</>}
        description={`Since ${BRAND.founded}, St Alessandro University Institute — a distinctive Anglo-Saxon university institute in Douala — has blended Cameroonian community values with Italian orthopaedic and clinical rigor.`}
      />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-default shadow-lifted">
              <Image
                src="/img/14.jpg"
                alt="St Alessandro University Institute campus, Bonaberi-Douala"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            {/* Official SAU crest */}
            <div className="absolute -bottom-5 -right-3 sm:-right-5 grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-2xl border border-default bg-surface-elevated p-2 shadow-lifted">
              <Image
                src={CREST_SRC}
                alt="St Alessandro University Institute crest"
                width={96}
                height={96}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="space-y-4 text-pretty">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-700)]">
              Welcome to St Alessandro University Institute
            </p>
            <p className="text-fg-secondary">
              St Alessandro University Institute is a distinctive Anglo-Saxon university
              institute. S.A.U officially opened its doors on the 17th of October 2022,
              close to a year after the opening of St Alessandro Clinic on the 1st of
              December 2021. It is located in Douala, the capital of the Littoral region
              of Cameroon.
            </p>
            <p className="text-fg-secondary">
              The institute was founded in loving memory of Prof. Alessandro Faldini by
              Dr. Mutsu Venantius Bumaha and Dr. Florence Nsuh Mutsu, drawing on long-standing
              ties with the orthopaedic institutes of Bologna and Galeazzi in Italy. Through
              ORTHOPAEDICS ONLUS (ortopedici.org) and the patronage of Prof. Cesare Faldini,
              the institute brings world-class orthopaedic and clinical training to Cameroon.
            </p>
            <p className="text-fg-secondary">
              Today S.A.U trains nurses, midwives, allied-health and food-science
              professionals — combining evidence-based curricula with hands-on clinical
              practice at St Alessandro Clinic and partner hospitals.
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Our heritage"
        title="Italian rigor, Cameroonian heart"
        description="A patronage that reaches from Prof. Cesare Faldini and the Rizzoli Institute in Bologna to the Promoter, staff and chaplaincy of our Bonaberi-Douala campus."
        align="left"
      >
        <CampusPhotoGrid
          photos={photosByIndex(3, 6, 13, 16)}
          showCategory={false}
        />
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} hover className="p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-900)] text-[var(--color-gold-400)] shadow-soft">
                <p.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-fg-primary">{p.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary text-pretty">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="A timeline"
        title="From a clinic to a university institute"
        description="In just a few short years, St Alessandro has grown from a clinic into a full university institute serving the Littoral region and beyond."
      >
        <ol className="relative mx-auto max-w-3xl border-l-2 border-[var(--color-gold-200)]/60 pl-6 sm:pl-10">
          {milestones.map((m, i) => (
            <li key={i} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[34px] sm:-left-[46px] grid h-8 w-8 place-items-center rounded-full bg-gradient-to-b from-[var(--color-gold-400)] to-[var(--color-gold-600)] text-[10px] font-bold text-[var(--color-brand-950)] shadow-soft ring-4 ring-[var(--surface-muted)]">
                {m.year.slice(-2)}
              </span>
              <div className="rounded-xl border border-default bg-surface-elevated p-5 shadow-soft">
                <p className="text-xs font-mono font-semibold tracking-wider text-[var(--color-gold-700)]">{m.year}</p>
                <p className="mt-1 text-sm text-fg-primary text-pretty">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Leadership"
        title="The team behind St Alessandro"
        description="Educators, clinicians and operational leaders united by a single mission — to graduate the most competent and compassionate practitioners in the region."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((l) => (
            <Card key={l.name} hover>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] font-display text-lg font-semibold text-[var(--color-brand-800)] shadow-soft">
                  {l.initials}
                </div>
                <div>
                  <div className="font-semibold text-fg-primary">{l.name}</div>
                  <div className="mt-0.5 text-xs text-fg-tertiary">{l.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Accreditations"
        title="Recognized where it matters"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND.accreditations.map((a) => (
            <Card key={a} className="p-5">
              <div className="flex items-start gap-3">
                <Award className="mt-0.5 h-5 w-5 text-[var(--color-gold-600)]" />
                <p className="text-sm font-medium text-fg-primary">{a}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
