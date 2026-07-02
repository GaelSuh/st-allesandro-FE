"use client";

import { useState } from "react";
import { Phone, Search, Send, Smile, Paperclip, Video } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const threads = [
  { id: "t1", name: "Mme. Sandrine Owono", role: "Lecturer · NUR-307", last: "Please review my assignment when you get a moment.", at: "now", unread: 2 },
  { id: "t2", name: "Pauline Bekolo", role: "Registrar", last: "Welcome packs ready for collection from Monday.", at: "1h", unread: 0 },
  { id: "t3", name: "Dr. Florence Mbongo", role: "Clinical Supervisor", last: "Approved your 3 logbook entries from this week.", at: "3h", unread: 0 },
  { id: "t4", name: "Finance Office", role: "Bursary", last: "Receipt SAUI-RCP-0421 attached.", at: "Yesterday", unread: 0 },
  { id: "t5", name: "Solange Mvondo", role: "Sponsor", last: "How was your shift this morning?", at: "Yesterday", unread: 1 },
];

const seedMessages = [
  { from: "them", text: "Hi Yolande — checking in on your case-study draft. Are you on track for Friday?" , at: "10:24" },
  { from: "me", text: "Yes Madam. I have the introduction and methodology done. Working on the discussion section now.", at: "10:27" },
  { from: "them", text: "Lovely. Remember to back up the discussion with at least 4 peer-reviewed sources.", at: "10:28" },
  { from: "me", text: "Will do — thank you for the reminder!", at: "10:30" },
  { from: "them", text: "Also: please send a draft by Wednesday so we have time for revisions.", at: "10:31" },
];

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState("t1");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(seedMessages);
  const selected = threads.find((t) => t.id === selectedId)!;

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "me", text: input, at: "now" }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { from: "them", text: "Got it — thanks!", at: "now" }]), 1100);
  };

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Communication" title="Messages" description="In-app messaging with faculty, supervisors and finance." />
      <Card className="grid grid-cols-1 lg:grid-cols-[320px_1fr] overflow-hidden h-[640px]">
        {/* List */}
        <aside className="border-r border-subtle flex flex-col">
          <div className="border-b border-subtle p-3"><Input placeholder="Search conversations…" leftIcon={<Search className="h-4 w-4" />} /></div>
          <div className="flex-1 overflow-y-auto">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={cn("flex w-full items-start gap-3 p-3 text-left border-b border-subtle", selectedId === t.id ? "bg-[var(--color-brand-50)]" : "hover:bg-surface-sunken")}
              >
                <Avatar name={t.name} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-fg-primary truncate">{t.name}</span>
                    <span className="text-[11px] text-fg-tertiary whitespace-nowrap">{t.at}</span>
                  </div>
                  <p className="text-[11px] text-fg-tertiary">{t.role}</p>
                  <p className="mt-0.5 text-xs text-fg-secondary line-clamp-1">{t.last}</p>
                </div>
                {t.unread > 0 && <Badge size="sm" variant="brand" className="ml-1">{t.unread}</Badge>}
              </button>
            ))}
          </div>
        </aside>

        {/* Conversation */}
        <section className="flex flex-col">
          <header className="flex items-center justify-between border-b border-subtle px-4 py-3">
            <div className="flex items-center gap-3"><Avatar name={selected.name} size="md" /><div><div className="font-semibold text-fg-primary">{selected.name}</div><div className="text-xs text-fg-tertiary">{selected.role}</div></div></div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon-sm"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon-sm"><Video className="h-4 w-4" /></Button>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[75%] rounded-2xl px-3.5 py-2 text-sm", m.from === "me" ? "bg-[var(--color-brand-700)] text-white" : "bg-surface-sunken text-fg-primary")}>
                  <p>{m.text}</p>
                  <p className={cn("mt-1 text-[10px]", m.from === "me" ? "text-white/60" : "text-fg-tertiary")}>{m.at}</p>
                </div>
              </div>
            ))}
          </div>
          <footer className="border-t border-subtle p-3">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" type="button"><Paperclip className="h-4 w-4" /></Button>
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message…" className="flex-1" />
              <Button variant="ghost" size="icon-sm" type="button"><Smile className="h-4 w-4" /></Button>
              <Button type="submit"><Send className="h-4 w-4" /></Button>
            </form>
          </footer>
        </section>
      </Card>
    </div>
  );
}
