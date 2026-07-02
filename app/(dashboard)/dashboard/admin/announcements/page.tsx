"use client";

import { useState } from "react";
import { Megaphone, Pin, Plus, Send } from "lucide-react";
import { toast } from "sonner";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { announcements as seed } from "@/data/notifications";
import { relativeTime } from "@/lib/utils";

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState(seed);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<"Academic"|"Clinical"|"Finance"|"Event"|"General">("General");
  const [audience, setAudience] = useState<"all"|"student"|"lecturer">("all");

  const post = () => {
    if (!title || body.length < 10) { toast.error("Please complete title and body."); return; }
    setItems([{ id: `ann_${Date.now()}`, title, body, category, audience: audience === "all" ? "all" : [audience as any], pinned: false, publishedAt: new Date().toISOString(), author: "Registry" }, ...items]);
    toast.success("Announcement published institution-wide");
    setTitle(""); setBody("");
  };

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Communication" title="Announcements" description="Broadcast across the whole institution or by role." />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <CardHeader><CardTitle>Compose</CardTitle><CardDescription>Reaches students, parents, faculty</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Category</Label><Select value={category} onValueChange={(v) => setCategory(v as any)}><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent>{["Academic","Clinical","Finance","Event","General"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Audience</Label><Select value={audience} onValueChange={(v) => setAudience(v as any)}><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All users</SelectItem><SelectItem value="student">Students</SelectItem><SelectItem value="lecturer">Lecturers</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label required>Title</Label><Input className="mt-1.5" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Important update for the academic week" /></div>
            <div><Label required>Body</Label><Textarea className="mt-1.5 min-h-[160px]" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Dear community…" /></div>
            <div className="flex justify-end"><Button onClick={post} leftIcon={<Send className="h-4 w-4" />}>Publish announcement</Button></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent announcements</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {items.map((a) => (
              <div key={a.id} className="rounded-xl border border-subtle p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2"><Badge size="sm" variant={a.category === "Finance" ? "gold" : a.category === "Clinical" ? "clinical" : a.category === "Event" ? "brand" : "neutral"}>{a.category}</Badge>{a.pinned && <Pin className="h-3 w-3 text-[var(--color-gold-600)]" />}</div>
                  <span className="text-[11px] text-fg-tertiary">{relativeTime(a.publishedAt)}</span>
                </div>
                <p className="mt-2 font-semibold text-fg-primary">{a.title}</p>
                <p className="mt-1 text-sm text-fg-secondary line-clamp-2">{a.body}</p>
                <p className="mt-2 text-[11px] text-fg-tertiary">By {a.author}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
