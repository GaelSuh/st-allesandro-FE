"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  commandOpen: boolean;
  setSidebar: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  openCommand: () => void;
  closeCommand: () => void;
  setCommand: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarOpen: false,
      sidebarCollapsed: false,
      commandOpen: false,
      setSidebar: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      toggleCollapse: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      openCommand: () => set({ commandOpen: true }),
      closeCommand: () => set({ commandOpen: false }),
      setCommand: (open) => set({ commandOpen: open }),
    }),
    { name: "saui.ui", partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed }) }
  )
);
