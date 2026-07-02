"use client";

import { useAuthStore } from "@/stores";
import { StudentHome } from "@/components/dashboard/dashboards/StudentHome";
import { LecturerHome } from "@/components/dashboard/dashboards/LecturerHome";
import { ClinicalHome } from "@/components/dashboard/dashboards/ClinicalHome";
import { SchoolAdminHome } from "@/components/dashboard/dashboards/SchoolAdminHome";
import { FinanceHome } from "@/components/dashboard/dashboards/FinanceHome";
import { ParentHome } from "@/components/dashboard/dashboards/ParentHome";
import { SuperAdminHome } from "@/components/dashboard/dashboards/SuperAdminHome";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  switch (user.role) {
    case "student": return <StudentHome />;
    case "lecturer": return <LecturerHome />;
    case "clinical_supervisor": return <ClinicalHome />;
    case "school_admin": return <SchoolAdminHome />;
    case "finance_officer": return <FinanceHome />;
    case "parent": return <ParentHome />;
    case "super_admin": return <SuperAdminHome />;
    default: return <StudentHome />;
  }
}
