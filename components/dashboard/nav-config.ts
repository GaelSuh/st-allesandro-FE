import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  Award,
  Banknote,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  FileBarChart2,
  FileSearch,
  GraduationCap,
  HeartPulse,
  Hospital,
  Inbox,
  LayoutDashboard,
  Library,
  Megaphone,
  MessageSquare,
  PackageSearch,
  Receipt,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  UserCheck,
  Wallet,
  Beaker,
} from "lucide-react";
import type { UserRole } from "@/types";

export interface NavItem {
  label: string;
  href: string;
  Icon: LucideIcon;
  badge?: number;
}
export interface NavGroup {
  label: string;
  items: NavItem[];
}

const SHARED: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
];

const STUDENT_NAV: NavGroup[] = [
  {
    label: "Academics",
    items: [
      { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
      { label: "My courses", href: "/dashboard/my-courses", Icon: BookOpen },
      { label: "Timetable", href: "/dashboard/timetable", Icon: CalendarDays },
      { label: "Results", href: "/dashboard/results", Icon: Award },
      { label: "Attendance", href: "/dashboard/attendance", Icon: UserCheck },
      { label: "CBT exams", href: "/dashboard/cbt", Icon: Beaker },
    ],
  },
  {
    label: "Clinical",
    items: [
      { label: "Rotations", href: "/dashboard/rotations", Icon: Hospital },
      { label: "Practical logbook", href: "/dashboard/logbook", Icon: ClipboardCheck },
    ],
  },
  {
    label: "Personal",
    items: [
      { label: "Finance & fees", href: "/dashboard/finance", Icon: Wallet, badge: 1 },
      { label: "Library", href: "/dashboard/library", Icon: Library },
      { label: "Notifications", href: "/dashboard/notifications", Icon: Inbox, badge: 3 },
      { label: "Settings", href: "/dashboard/settings", Icon: Settings },
    ],
  },
];

const LECTURER_NAV: NavGroup[] = [
  {
    label: "Teaching",
    items: [
      { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
      { label: "My courses", href: "/dashboard/lecturer/courses", Icon: BookOpen },
      { label: "Attendance", href: "/dashboard/lecturer/attendance", Icon: UserCheck },
      { label: "Grade book", href: "/dashboard/lecturer/grading", Icon: ClipboardList },
      { label: "Assignments", href: "/dashboard/lecturer/assignments", Icon: FileSearch },
      { label: "Announcements", href: "/dashboard/lecturer/announcements", Icon: Megaphone },
    ],
  },
  {
    label: "Personal",
    items: [
      { label: "Messages", href: "/dashboard/messages", Icon: MessageSquare },
      { label: "Settings", href: "/dashboard/settings", Icon: Settings },
    ],
  },
];

const CLINICAL_NAV: NavGroup[] = [
  {
    label: "Clinical",
    items: [
      { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
      { label: "Rotations", href: "/dashboard/clinical/rotations", Icon: Hospital },
      { label: "Logbook review", href: "/dashboard/clinical/logbook-review", Icon: ClipboardCheck, badge: 5 },
      { label: "Evaluations", href: "/dashboard/clinical/evaluations", Icon: Award },
      { label: "Schedules", href: "/dashboard/clinical/schedules", Icon: CalendarDays },
    ],
  },
  {
    label: "Communication",
    items: [
      { label: "Messages", href: "/dashboard/messages", Icon: MessageSquare },
      { label: "Settings", href: "/dashboard/settings", Icon: Settings },
    ],
  },
];

const SCHOOL_ADMIN_NAV: NavGroup[] = [
  {
    label: "Operations",
    items: [
      { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
      { label: "Students", href: "/dashboard/students", Icon: GraduationCap },
      { label: "Admissions", href: "/dashboard/admissions", Icon: Inbox, badge: 12 },
      { label: "Courses", href: "/dashboard/courses", Icon: BookOpen },
      { label: "Lecturers", href: "/dashboard/lecturers", Icon: Briefcase },
      { label: "Departments", href: "/dashboard/departments", Icon: Building2 },
    ],
  },
  {
    label: "Academic",
    items: [
      { label: "Results", href: "/dashboard/admin/results", Icon: Award },
      { label: "Attendance", href: "/dashboard/admin/attendance", Icon: UserCheck },
      { label: "Timetables", href: "/dashboard/admin/timetables", Icon: CalendarDays },
      { label: "Announcements", href: "/dashboard/admin/announcements", Icon: Megaphone },
    ],
  },
  {
    label: "Campus",
    items: [
      { label: "Hostels", href: "/dashboard/admin/hostels", Icon: Building2 },
      { label: "Library", href: "/dashboard/admin/library", Icon: Library },
      { label: "Inventory", href: "/dashboard/admin/inventory", Icon: PackageSearch },
      { label: "Events", href: "/dashboard/admin/events", Icon: CalendarDays },
    ],
  },
];

const FINANCE_NAV: NavGroup[] = [
  {
    label: "Finance",
    items: [
      { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
      { label: "Invoices", href: "/dashboard/finance/invoices", Icon: Receipt },
      { label: "Payments", href: "/dashboard/finance/payments", Icon: Banknote },
      { label: "Scholarships", href: "/dashboard/finance/scholarships", Icon: Award },
      { label: "Reports", href: "/dashboard/finance/reports", Icon: FileBarChart2 },
    ],
  },
  {
    label: "Personal",
    items: [
      { label: "Notifications", href: "/dashboard/notifications", Icon: Inbox },
      { label: "Settings", href: "/dashboard/settings", Icon: Settings },
    ],
  },
];

const PARENT_NAV: NavGroup[] = [
  {
    label: "Sponsorship",
    items: [
      { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
      { label: "Fees & payments", href: "/dashboard/parent/payments", Icon: Wallet },
      { label: "Academic progress", href: "/dashboard/parent/academic", Icon: Award },
      { label: "Attendance", href: "/dashboard/parent/attendance", Icon: UserCheck },
      { label: "Clinical progress", href: "/dashboard/parent/clinical", Icon: Stethoscope },
    ],
  },
  {
    label: "Communication",
    items: [
      { label: "Messages", href: "/dashboard/messages", Icon: MessageSquare },
      { label: "Notifications", href: "/dashboard/notifications", Icon: Inbox },
    ],
  },
];

const SUPER_ADMIN_NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
      { label: "Analytics", href: "/dashboard/super/analytics", Icon: Activity },
      { label: "System monitoring", href: "/dashboard/super/system", Icon: HeartPulse },
    ],
  },
  {
    label: "People & access",
    items: [
      { label: "Users", href: "/dashboard/super/users", Icon: Users },
      { label: "Roles & permissions", href: "/dashboard/super/roles", Icon: ShieldCheck },
      { label: "Audit logs", href: "/dashboard/super/audit", Icon: FileSearch },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Students", href: "/dashboard/students", Icon: GraduationCap },
      { label: "Admissions", href: "/dashboard/admissions", Icon: Inbox },
      { label: "Finance", href: "/dashboard/finance/invoices", Icon: Wallet },
      { label: "Clinical", href: "/dashboard/clinical/rotations", Icon: Hospital },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Announcements", href: "/dashboard/admin/announcements", Icon: Megaphone },
      { label: "Settings", href: "/dashboard/settings", Icon: Settings },
    ],
  },
];

export function getNavForRole(role: UserRole): NavGroup[] {
  switch (role) {
    case "student": return STUDENT_NAV;
    case "lecturer": return LECTURER_NAV;
    case "clinical_supervisor": return CLINICAL_NAV;
    case "school_admin": return SCHOOL_ADMIN_NAV;
    case "finance_officer": return FINANCE_NAV;
    case "parent": return PARENT_NAV;
    case "super_admin": return SUPER_ADMIN_NAV;
    default: return [{ label: "Main", items: SHARED }];
  }
}

export const ROLE_LABEL: Record<UserRole, string> = {
  super_admin: "Super Admin",
  school_admin: "School Admin",
  finance_officer: "Finance Officer",
  lecturer: "Lecturer",
  clinical_supervisor: "Clinical Supervisor",
  student: "Student",
  parent: "Parent / Sponsor",
};
