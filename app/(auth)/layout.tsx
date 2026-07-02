import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { BRAND } from "@/lib/brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh grid lg:grid-cols-[1fr_1.1fr] bg-surface-muted">
      {/* Left — form column */}
      <div className="relative flex flex-col">
        <header className="flex items-center justify-between p-6 lg:p-8">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center px-6 pb-12 lg:px-12">
          <div className="w-full max-w-md">{children}</div>
        </main>
        <footer className="px-6 pb-6 text-center text-xs text-fg-tertiary lg:px-8">
          © {new Date().getFullYear()} {BRAND.name}
        </footer>
      </div>

      {/* Right — premium visual column */}
      <div className="relative hidden overflow-hidden lg:block bg-[var(--color-brand-950)]">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-[var(--color-gold-500)] opacity-25 blur-3xl" />
        <div className="absolute -left-40 bottom-10 h-[32rem] w-[32rem] rounded-full bg-[var(--color-brand-500)] opacity-25 blur-3xl" />

        <div className="relative h-full flex flex-col p-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-300)]">Excellence in nursing</p>
            <p className="mt-2 text-sm text-white/85">Trusted by 2,400+ students across 38 partner hospitals.</p>
          </div>

          <div className="mt-auto">
            <p className="font-display text-[2.6rem] leading-[1.05] font-semibold text-white text-balance">
              Where compassionate practice meets clinical mastery.
            </p>
            <p className="mt-4 max-w-md text-white/75">
              Sign in to the St Alessandro portal — your academic, financial and clinical journey in one place.
            </p>

            {/* Demo accounts hint */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-300)]">Demo accounts</p>
              <table className="mt-3 w-full text-xs">
                <thead>
                  <tr className="text-white/60">
                    <th className="pb-2 text-left font-medium">Role</th>
                    <th className="pb-2 text-left font-medium">Email</th>
                    <th className="pb-2 text-left font-medium">Password</th>
                  </tr>
                </thead>
                <tbody className="text-white/85">
                  {[
                    ["Super Admin", "admin@stalessandro.edu", "admin123"],
                    ["School Admin", "registrar@stalessandro.edu", "registrar123"],
                    ["Finance", "finance@stalessandro.edu", "finance123"],
                    ["Lecturer", "s.owono@stalessandro.edu", "lecturer123"],
                    ["Clinical", "f.mbongo@laquintinie.cm", "clinical123"],
                    ["Student", "yolande.mvondo@student.stalessandro.edu", "student123"],
                    ["Parent", "solange.mvondo@gmail.com", "parent123"],
                  ].map(([role, email, pwd]) => (
                    <tr key={role} className="border-t border-white/10">
                      <td className="py-1.5 pr-2 font-medium">{role}</td>
                      <td className="py-1.5 pr-2 font-mono text-[11px] truncate max-w-[14rem]">{email}</td>
                      <td className="py-1.5 font-mono text-[11px]">{pwd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-[11px] text-white/60">Tip: password <code className="rounded bg-white/10 px-1 py-0.5">demo</code> works for any role.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
