import Link from "next/link";
import { AtSign, Camera, Briefcase, Mail, MapPin, Phone, MessageCircle, Play } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/brand";

const columns = [
  {
    title: "Academics",
    links: [
      { label: "Programs", href: "/programs" },
      { label: "Departments", href: "/departments" },
      { label: "Clinical Training", href: "/clinical-training" },
      { label: "Staff", href: "/staff" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "Overview", href: "/admissions" },
      { label: "Apply now", href: "/apply" },
      { label: "Scholarships", href: "/scholarships" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Campus",
    links: [
      { label: "Student Life", href: "/student-life" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Institution",
    links: [
      { label: "About", href: "/about" },
      { label: "News", href: "/news" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[var(--color-brand-950)] text-white">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--color-gold-400)] to-transparent" />
      <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-[var(--color-gold-700)] opacity-10 blur-3xl" />
      <div className="absolute -left-32 -bottom-20 h-72 w-72 rounded-full bg-[var(--color-brand-500)] opacity-15 blur-3xl" />

      <Container className="relative pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo variant="white" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {BRAND.tagline}
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-gold-400)]" />
                <span>{BRAND.location.address}</span>
              </div>
              <a href={`tel:${BRAND.contact.phone}`} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 text-[var(--color-gold-400)]" /> {BRAND.contact.phone}
              </a>
              <a href={`mailto:${BRAND.contact.email}`} className="flex items-center gap-2.5 hover:text-white break-all">
                <Mail className="h-4 w-4 text-[var(--color-gold-400)]" /> {BRAND.contact.email}
              </a>
            </div>
            <div className="mt-6 flex items-center gap-2">
              {[
                [AtSign, BRAND.social.facebook],
                [Camera, BRAND.social.instagram],
                [Briefcase, BRAND.social.linkedin],
                [MessageCircle, BRAND.social.twitter],
                [Play, BRAND.social.youtube],
              ].map(([Icon, href], i) => (
                <a
                  key={i}
                  href={href as string}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-ring"
                  target="_blank"
                  rel="noreferrer"
                >
                  {(() => {
                    const I = Icon as typeof Mail;
                    return <I className="h-4 w-4" />;
                  })()}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-300)]">{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. Established {BRAND.founded}.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>Accredited by the Ministry of Higher Education, Cameroon</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
