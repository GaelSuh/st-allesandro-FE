"use client";

import { useMemo, useState } from "react";
import { Filter, MoreHorizontal, Search, ShieldCheck, UserPlus } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { DEMO_USER_DIRECTORY } from "@/stores/auth-store";
import { ROLE_LABEL } from "@/components/dashboard/nav-config";
import type { UserRole } from "@/types";
import { lecturers, students } from "@/data/people";

interface DirectoryItem { id: string; name: string; email: string; role: UserRole; avatar?: string; matricule?: string; department?: string; lastSeen: string; }

const seed: DirectoryItem[] = [
  ...Object.values(DEMO_USER_DIRECTORY).map((u) => ({ ...u, lastSeen: "Just now" })),
  ...lecturers.slice(0, 5).map((l) => ({ id: l.id, name: l.name, email: l.email, role: "lecturer" as UserRole, avatar: l.avatar, matricule: l.id, department: l.department, lastSeen: "2 hrs ago" })),
  ...students.slice(0, 12).map((s) => ({ id: s.id, name: s.name, email: s.email, role: "student" as UserRole, avatar: s.avatar, matricule: s.matricule, department: s.programName, lastSeen: `${Math.floor(Math.random() * 60)} min ago` })),
];

export default function UsersPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const filtered = useMemo(() => seed.filter((u) => {
    if (role !== "all" && u.role !== role) return false;
    if (q && !`${u.name} ${u.email} ${u.matricule ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, role]);

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Identity & access"
        title="Users"
        description={`${seed.length} accounts across all roles.`}
        actions={
          <>
            <Button variant="secondary" leftIcon={<ShieldCheck className="h-4 w-4" />}>Permissions</Button>
            <Button leftIcon={<UserPlus className="h-4 w-4" />}>Invite user</Button>
          </>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>{filtered.length} accounts</CardTitle><CardDescription>Filter by role or search by name/matricule</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-72" />
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-48"><Filter className="h-3.5 w-3.5 mr-1 text-fg-tertiary" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  {Object.entries(ROLE_LABEL).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                <th className="pb-3">User</th><th className="pb-3">Role</th><th className="pb-3">Department</th><th className="pb-3">Matricule</th><th className="pb-3">Last seen</th><th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-surface-sunken/40">
                  <td className="py-3"><div className="flex items-center gap-3"><Avatar src={u.avatar} name={u.name} size="sm" /><div><div className="font-medium text-fg-primary">{u.name}</div><div className="text-xs text-fg-tertiary">{u.email}</div></div></div></td>
                  <td className="py-3"><Badge size="sm" variant={u.role === "super_admin" ? "danger" : u.role === "school_admin" ? "gold" : u.role === "lecturer" ? "brand" : u.role === "clinical_supervisor" ? "clinical" : "neutral"}>{ROLE_LABEL[u.role]}</Badge></td>
                  <td className="py-3 text-fg-secondary truncate max-w-[16rem]">{u.department ?? "—"}</td>
                  <td className="py-3 font-mono text-xs text-fg-tertiary">{u.matricule ?? "—"}</td>
                  <td className="py-3 text-xs text-fg-tertiary">{u.lastSeen}</td>
                  <td className="py-3 text-right"><button className="grid h-7 w-7 place-items-center rounded-md text-fg-tertiary hover:bg-surface-sunken hover:text-fg-primary"><MoreHorizontal className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
