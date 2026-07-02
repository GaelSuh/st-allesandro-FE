"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const nav = [
  { label: "About", href: "/about" },
  {
    label: "Academics",
    items: [
      { label: "Programs", href: "/programs", description: "All degrees, HND and diplomas" },
      { label: "Departments", href: "/departments", description: "Faculties & research" },
      { label: "Clinical Training", href: "/clinical-training", description: "Hospital partnerships & simulation labs" },
      { label: "Staff & Lecturers", href: "/staff", description: "Meet the faculty" },
    ],
  },
  {
    label: "Student Life",
    items: [
      { label: "Campus Life", href: "/student-life", description: "Hostels, clubs, athletics" },
      { label: "Gallery", href: "/gallery", description: "Snapshots from campus" },
      { label: "Events", href: "/events", description: "Open days, symposiums" },
      { label: "Testimonials", href: "/testimonials", description: "Voices from alumni" },
    ],
  },
  {
    label: "Admissions",
    items: [
      { label: "Admissions Overview", href: "/admissions", description: "Process, deadlines & criteria" },
      { label: "Scholarships", href: "/scholarships", description: "Merit & need-based aid" },
      { label: "Apply Now", href: "/apply", description: "Start your application" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Contact", href: "/contact" },
];

export function PublicNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-default shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            "items" in item && item.items ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-fg-secondary transition-colors hover:text-fg-primary",
                    openMenu === item.label && "text-fg-primary"
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openMenu === item.label && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
                    >
                      <div className="w-[420px] rounded-2xl border border-default bg-surface-elevated p-2 shadow-lifted">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-sunken"
                          >
                            <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-700)] group-hover:bg-[var(--color-brand-100)]">
                              <span className="text-xs font-bold">{sub.label[0]}</span>
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-fg-primary">{sub.label}</div>
                              <div className="mt-0.5 text-xs text-fg-tertiary line-clamp-1">{sub.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href ? "text-fg-primary" : "text-fg-secondary hover:text-fg-primary"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link href="/apply">Apply now</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-fg-primary lg:hidden focus-ring"
          aria-label="Open menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-default bg-surface-elevated"
          >
            <div className="space-y-1 px-4 pb-6 pt-3">
              {nav.flatMap((item) =>
                "items" in item && item.items
                  ? [
                      <div key={item.label} className="pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
                        {item.label}
                      </div>,
                      ...item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-fg-secondary hover:bg-surface-sunken hover:text-fg-primary"
                        >
                          {sub.label}
                        </Link>
                      )),
                    ]
                  : [
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-fg-secondary hover:bg-surface-sunken hover:text-fg-primary"
                      >
                        {item.label}
                      </Link>,
                    ]
              )}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button asChild variant="secondary" size="md">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild variant="gold" size="md">
                  <Link href="/apply">Apply now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
