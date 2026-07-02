"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "@/types";
import { avatarUrl } from "@/lib/utils";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role?: UserRole) => Promise<{ ok: boolean; error?: string; user?: User }>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

// Demo accounts for each role
const DEMO_USERS: Record<UserRole, User> = {
  super_admin: {
    id: "u_admin",
    name: "Alessandro Foncha",
    email: "admin@stalessandro.edu",
    role: "super_admin",
    avatar: avatarUrl("Alessandro Foncha"),
    matricule: "ADMIN-001",
    phone: "+237 673 409 309",
    department: "Office of the Rector",
    joinedAt: "2009-09-01",
  },
  school_admin: {
    id: "u_schadmin",
    name: "Pauline Bekolo",
    email: "registrar@stalessandro.edu",
    role: "school_admin",
    avatar: avatarUrl("Pauline Bekolo"),
    matricule: "ADM-101",
    phone: "+237 671 200 188",
    department: "Registry",
    joinedAt: "2014-01-15",
  },
  finance_officer: {
    id: "u_finance",
    name: "Hervé Ngono",
    email: "finance@stalessandro.edu",
    role: "finance_officer",
    avatar: avatarUrl("Herve Ngono"),
    matricule: "FIN-211",
    phone: "+237 698 110 422",
    department: "Bursary",
    joinedAt: "2017-05-10",
  },
  lecturer: {
    id: "u_lec",
    name: "Mme. Sandrine Owono",
    email: "s.owono@stalessandro.edu",
    role: "lecturer",
    avatar: avatarUrl("Sandrine Owono"),
    matricule: "STF-503",
    phone: "+237 678 333 220",
    department: "School of Nursing",
    joinedAt: "2016-09-05",
  },
  clinical_supervisor: {
    id: "u_clin",
    name: "Dr. Florence Mbongo",
    email: "f.mbongo@laquintinie.cm",
    role: "clinical_supervisor",
    avatar: avatarUrl("Florence Mbongo"),
    matricule: "CLN-088",
    phone: "+237 691 220 510",
    department: "Laquintinie Hospital",
    joinedAt: "2018-03-12",
  },
  student: {
    id: "stu_me",
    name: "Yolande Mvondo",
    email: "yolande.mvondo@student.stalessandro.edu",
    role: "student",
    avatar: avatarUrl("Yolande Mvondo"),
    matricule: "SAUI/22/0421",
    phone: "+237 678 220 944",
    department: "School of Nursing",
    joinedAt: "2022-09-01",
  },
  parent: {
    id: "u_parent",
    name: "Solange Mvondo",
    email: "solange.mvondo@gmail.com",
    role: "parent",
    avatar: avatarUrl("Solange Mvondo"),
    matricule: "PRT-0421",
    phone: "+237 671 332 008",
    department: "Sponsor",
    joinedAt: "2022-09-01",
  },
};

export const DEMO_PASSWORDS: Record<UserRole, string> = {
  super_admin: "admin123",
  school_admin: "registrar123",
  finance_officer: "finance123",
  lecturer: "lecturer123",
  clinical_supervisor: "clinical123",
  student: "student123",
  parent: "parent123",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password, role) => {
        set({ isLoading: true, error: null });
        await new Promise((r) => setTimeout(r, 900));

        const normalized = email.trim().toLowerCase();

        // Validate against known demo accounts
        const match = Object.entries(DEMO_USERS).find(
          ([r, u]) => u.email.toLowerCase() === normalized || (role && r === role && u.email.toLowerCase().split("@")[0] === normalized.split("@")[0])
        );

        if (!match) {
          const err = "We couldn't find an account with that email address. Try one of the demo logins on the right.";
          set({ isLoading: false, error: err });
          return { ok: false, error: err };
        }

        const [resolvedRole, user] = match as [UserRole, User];
        const expectedPassword = DEMO_PASSWORDS[resolvedRole];
        if (password !== expectedPassword && password !== "demo") {
          const err = "Incorrect password. Demo password for this role is shown on the right.";
          set({ isLoading: false, error: err });
          return { ok: false, error: err };
        }

        set({ user, isAuthenticated: true, isLoading: false, error: null });
        return { ok: true, user };
      },

      logout: () => set({ user: null, isAuthenticated: false }),
      setRole: (role) => set({ user: DEMO_USERS[role], isAuthenticated: true }),
    }),
    {
      name: "saui.auth",
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
    }
  )
);

export const DEMO_USER_DIRECTORY = DEMO_USERS;
