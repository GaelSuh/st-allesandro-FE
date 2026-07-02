"use client";

import { create } from "zustand";
import type { LogbookEntry, Rotation } from "@/types";
import { rotations as seedRotations, logbookEntries as seedEntries } from "@/data/clinical";

interface ClinicalState {
  rotations: Rotation[];
  entries: LogbookEntry[];
  addEntry: (entry: Omit<LogbookEntry, "id" | "status" | "date">) => void;
  approveEntry: (id: string, notes?: string) => void;
  rejectEntry: (id: string, notes: string) => void;
  logHours: (rotationId: string, hours: number) => void;
}

export const useClinicalStore = create<ClinicalState>((set) => ({
  rotations: seedRotations,
  entries: seedEntries,

  addEntry: (entry) =>
    set((s) => ({
      entries: [
        {
          ...entry,
          id: `log_${Date.now()}`,
          status: "pending",
          date: new Date().toISOString(),
        },
        ...s.entries,
      ],
    })),

  approveEntry: (id, notes) =>
    set((s) => ({
      entries: s.entries.map((e) =>
        e.id === id
          ? {
              ...e,
              status: "approved",
              supervisorId: "u_clin",
              supervisorName: "Dr. Florence Mbongo",
              supervisorNotes: notes,
              supervisorSignature: `Dr. F. Mbongo · ${new Date().toLocaleDateString()}`,
            }
          : e
      ),
    })),

  rejectEntry: (id, notes) =>
    set((s) => ({
      entries: s.entries.map((e) =>
        e.id === id ? { ...e, status: "revision", supervisorNotes: notes } : e
      ),
    })),

  logHours: (rotationId, hours) =>
    set((s) => ({
      rotations: s.rotations.map((r) =>
        r.id === rotationId
          ? { ...r, hoursCompleted: Math.min(r.hoursRequired, r.hoursCompleted + hours) }
          : r
      ),
    })),
}));
