"use client";

import { useState } from "react";
import { Megaphone, Plus, Send, Users } from "lucide-react";
import { toast } from "sonner";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

const recent = [
  { id: 1, title: "Mid-semester case-study deadline", course: "NUR-307", at: "2 days ago", views: 58 },
  { id: 2, title: "Pharmacology tutorial rescheduled", course: "NUR-205", at: "5 days ago", views: 84 },
  { id: 3, title: "Reading list for week 8 uploaded", course: "NUR-405", at: "1 week ago", views: 32 },
];

export default function LecturerAnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [course, setCourse] = useState("NUR-307");
  const post = () => {
    if (!title || body.length < 10) { toast.error("Add a title and at least 10 characters of body."); return; }
    toast.success("Announcement published");
    setTitle(""); setBody("");
  };

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Communication" title="Class announcements" description="Reach all enrolled students instantly via in-app + email + WhatsApp." />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader><CardTitle>Compose</CardTitle><CardDescription>Visible immediately to selected audience</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Audience</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="NUR-307">NUR-307 · OB-GYN</SelectItem><SelectItem value="NUR-205">NUR-205 · Foundations II</SelectItem><SelectItem value="NUR-405">NUR-405 · Maternal</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label required>Title</Label><Input className="mt-1.5" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tomorrow's class venue update" /></div>
            <div><Label required>Body</Label><Textarea className="mt-1.5 min-h-[140px]" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Dear students…" /></div>
            <div className="flex items-center justify-between border-t border-subtle pt-3">
              <span className="inline-flex items-center gap-2 text-xs text-fg-tertiary"><Users className="h-3 w-3" />Will reach <strong className="text-fg-primary">60 students</strong></span>
              <Button onClick={post} leftIcon={<Send className="h-4 w-4" />}>Publish</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent posts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {recent.map((r) => (
              <div key={r.id} className="rounded-lg border border-subtle p-3">
                <div className="flex items-center justify-between gap-2"><Badge variant="brand" size="sm">{r.course}</Badge><span className="text-[11px] text-fg-tertiary">{r.at}</span></div>
                <p className="mt-2 text-sm font-semibold text-fg-primary">{r.title}</p>
                <p className="mt-0.5 text-[11px] text-fg-tertiary">{r.views} views</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
