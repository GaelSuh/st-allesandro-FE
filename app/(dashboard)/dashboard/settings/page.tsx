"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import { Avatar } from "@/components/ui/Avatar";
import { Separator } from "@/components/ui/Separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { useAuthStore } from "@/stores";
import { ROLE_LABEL } from "@/components/dashboard/nav-config";
import type { UserRole } from "@/types";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const setRole = useAuthStore((s) => s.setRole);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [notifs, setNotifs] = useState({ email: true, sms: false, whatsapp: true, inApp: true });

  if (!user) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 skeleton" />
        <div className="h-72 skeleton rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Account" title="Settings" description="Manage your profile, security and notification preferences." />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="role">Switch role</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 border-b border-subtle pb-6">
                <Avatar name={user.name} src={user.avatar} size="2xl" ring />
                <div className="flex-1">
                  <div className="font-display text-xl font-semibold text-fg-primary">{user.name}</div>
                  <div className="text-sm text-fg-secondary">{user.email}</div>
                  <div className="text-xs text-fg-tertiary">{ROLE_LABEL[user.role]} · {user.matricule}</div>
                </div>
                <Button variant="secondary" size="sm">Change photo</Button>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div><Label>Full name</Label><Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div><Label>Email</Label><Input className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><Label>Phone</Label><Input className="mt-1.5" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                <div><Label>Department</Label><Input className="mt-1.5" value={user.department ?? ""} disabled /></div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => toast.success("Profile updated")}>Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="p-6 space-y-5">
              <div>
                <h3 className="font-semibold text-fg-primary">Change password</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div><Label>Current password</Label><Input type="password" className="mt-1.5" /></div>
                  <div></div>
                  <div><Label>New password</Label><Input type="password" className="mt-1.5" /></div>
                  <div><Label>Confirm new password</Label><Input type="password" className="mt-1.5" /></div>
                </div>
                <div className="mt-4"><Button>Update password</Button></div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><h3 className="font-semibold text-fg-primary">Two-factor authentication</h3><p className="text-sm text-fg-secondary">Add an extra security layer at sign-in.</p></div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><h3 className="font-semibold text-fg-primary">Active sessions</h3><p className="text-sm text-fg-secondary">Current device · Chrome on Windows · Douala</p></div>
                <Button variant="ghost" size="sm" className="text-[oklch(0.55_0.205_25)]">Sign out other sessions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="p-6 divide-y divide-[var(--border-subtle)]">
              {[
                { id: "email", label: "Email notifications", desc: "Receive announcements and receipts by email" },
                { id: "sms", label: "SMS alerts", desc: "Critical updates via SMS (charges may apply)" },
                { id: "whatsapp", label: "WhatsApp", desc: "Convenient reminders via WhatsApp" },
                { id: "inApp", label: "In-app", desc: "Bell-icon notifications when you're online" },
              ].map((n, i) => (
                <div key={n.id} className={`flex items-center justify-between py-4 ${i === 0 && "pt-0"}`}>
                  <div><h3 className="font-medium text-fg-primary">{n.label}</h3><p className="text-xs text-fg-tertiary">{n.desc}</p></div>
                  <Switch checked={(notifs as any)[n.id]} onCheckedChange={(v) => setNotifs((s) => ({ ...s, [n.id]: !!v }))} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="role">
          <Card>
            <CardContent className="p-6">
              <CardTitle className="text-base">Quick role switch (demo)</CardTitle>
              <CardDescription className="mt-1">Try the platform from a different stakeholder's perspective. This is a demo-only feature.</CardDescription>
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {(["student","parent","lecturer","clinical_supervisor","finance_officer","school_admin","super_admin"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); toast.success(`Switched to ${ROLE_LABEL[r]}`); }}
                    className={`rounded-xl border p-4 text-left transition-all hover:border-strong ${user.role === r ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)]/40" : "border-default"}`}
                  >
                    <div className="text-sm font-semibold text-fg-primary">{ROLE_LABEL[r]}</div>
                    <div className="text-[11px] text-fg-tertiary">{r === user.role ? "Current" : "Try this view"}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
