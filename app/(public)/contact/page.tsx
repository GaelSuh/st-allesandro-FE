"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send, MessageCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Label, FieldError } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { BRAND } from "@/lib/brand";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.length < 2) next.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "We need a valid email to reply.";
    if (!form.topic) next.topic = "Pick a topic so we route your message correctly.";
    if (form.message.length < 20) next.message = "Tell us a bit more (20+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error("Please complete the highlighted fields");
      return;
    }
    setSending(true);
    const subject = `[Website enquiry] ${form.topic} — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "—"}`,
      `Topic: ${form.topic}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${BRAND.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSending(false);
    toast.success(`Opening your email app to send to ${BRAND.contact.email}…`);
  };

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="We'd love to hear from you."
        description="Whether you're a prospective student, a parent, a hospital partner or a member of the press — our team responds within one working day."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-fg-primary">Send us a message</h2>
              <form onSubmit={submit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label required>Full name</Label>
                    <Input className="mt-1.5" value={form.name} error={!!errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <FieldError>{errors.name}</FieldError>
                  </div>
                  <div>
                    <Label required>Email</Label>
                    <Input className="mt-1.5" type="email" value={form.email} error={!!errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <FieldError>{errors.email}</FieldError>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input className="mt-1.5" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional" />
                  </div>
                  <div>
                    <Label required>Topic</Label>
                    <Select value={form.topic} onValueChange={(v) => setForm({ ...form, topic: v })}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a topic" /></SelectTrigger>
                      <SelectContent>
                        {[
                          "Admissions",
                          "Scholarships & financial aid",
                          "Programs & curriculum",
                          "Clinical partnerships",
                          "Press & media",
                          "Careers",
                          "Other",
                        ].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FieldError>{errors.topic}</FieldError>
                  </div>
                </div>
                <div>
                  <Label required>Message</Label>
                  <Textarea className="mt-1.5 min-h-[160px]" value={form.message} error={!!errors.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  <FieldError>{errors.message}</FieldError>
                </div>
                <div className="flex items-center justify-end">
                  <Button type="submit" loading={sending} rightIcon={!sending && <Send className="h-4 w-4" />}>
                    Send message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card><CardContent className="p-5 flex items-start gap-4">
              <Item Icon={MapPin} label="Visit us" value={BRAND.location.address} sub={BRAND.contact.hours} />
            </CardContent></Card>
            <Card><CardContent className="p-5 flex items-start gap-4">
              <Item Icon={Phone} label="Call us" value={BRAND.contact.phones.join(" · ")} sub={BRAND.contact.hours} />
            </CardContent></Card>
            <Card><CardContent className="p-5 flex items-start gap-4">
              <Item Icon={Mail} label="Email us" value={BRAND.contact.emails.join("  ·  ")} sub="Replies within 24 hrs" />
            </CardContent></Card>
            <Card><CardContent className="p-5 flex items-start gap-4">
              <Item Icon={MessageCircle} label="WhatsApp" value={BRAND.contact.whatsapp} sub="Instant during office hours" />
            </CardContent></Card>
            <Card className="overflow-hidden">
              <iframe
                title="St Alessandro University Institute — Bonaberi-Douala"
                src={`https://www.google.com/maps?q=${BRAND.location.coords.lat},${BRAND.location.coords.lng}&z=17&output=embed`}
                className="aspect-video w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${BRAND.location.coords.lat},${BRAND.location.coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 border-t border-default px-4 py-3 text-sm font-semibold text-[var(--color-brand-700)] hover:bg-surface-sunken"
              >
                <MapPin className="h-4 w-4" /> Get directions
              </a>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

function Item({ Icon, label, value, sub }: { Icon: React.ElementType; label: string; value: string; sub: string }) {
  return (
    <>
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-fg-tertiary">{label}</p>
        <p className="text-sm font-semibold text-fg-primary break-words">{value}</p>
        <p className="text-xs text-fg-secondary mt-0.5 flex items-center gap-1"><Clock className="h-3 w-3" /> {sub}</p>
      </div>
    </>
  );
}
