"use client";

import { Mail, Phone, MapPin, Calendar, Award } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores";
import { ROLE_LABEL } from "@/components/dashboard/nav-config";
import { currentStudent } from "@/data/people";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  if (!user) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 skeleton" />
        <div className="h-48 skeleton rounded-2xl" />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Profile" title="My profile" />
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar name={user.name} src={user.avatar} size="2xl" ring />
            <div className="flex-1">
              <div className="font-display text-2xl font-semibold text-fg-primary">{user.name}</div>
              <Badge variant="brand" className="mt-1.5">{ROLE_LABEL[user.role]}</Badge>
              <div className="mt-3 grid gap-1.5 text-sm text-fg-secondary sm:grid-cols-2">
                <div className="inline-flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{user.email}</div>
                {user.phone && <div className="inline-flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{user.phone}</div>}
                {user.department && <div className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{user.department}</div>}
                <div className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />Joined {new Date(user.joinedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long" })}</div>
              </div>
            </div>
            <Button variant="secondary">Edit profile</Button>
          </div>
        </CardContent>
      </Card>

      {user.role === "student" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader><CardTitle>Academic record</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <Row k="Matricule" v={currentStudent.matricule} />
                <Row k="Program" v={currentStudent.programName} />
                <Row k="Level" v={currentStudent.level} />
                <Row k="CGPA" v={currentStudent.cgpa.toFixed(2)} />
                <Row k="Status" v={<Badge size="sm" variant="success">Active</Badge>} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Guardian / Sponsor</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <Row k="Name" v={currentStudent.guardian.name} />
                <Row k="Relation" v={currentStudent.guardian.relation} />
                <Row k="Phone" v={currentStudent.guardian.phone} />
                <Row k="Email" v={currentStudent.guardian.email} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Medical information</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <Row k="Blood group" v="O+" />
                <Row k="Allergies" v="None recorded" />
                <Row k="Emergency" v={currentStudent.guardian.phone} />
                <Row k="Insurance" v="SAUI Group plan · active" />
                <Row k="Vaccinations" v={<Badge size="sm" variant="success">Up to date</Badge>} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="flex items-center justify-between border-b border-subtle py-1.5 last:border-0"><span className="text-xs text-fg-tertiary">{k}</span><span className="text-fg-primary">{v}</span></div>;
}
