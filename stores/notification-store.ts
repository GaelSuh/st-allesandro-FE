"use client";

import { create } from "zustand";
import type { Notification } from "@/types";
import { initialNotifications } from "@/data/notifications";

interface NotifState {
  items: Notification[];
  unreadCount: () => number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  push: (n: Omit<Notification, "id" | "createdAt" | "read">) => void;
}

export const useNotificationStore = create<NotifState>((set, get) => ({
  items: initialNotifications,
  unreadCount: () => get().items.filter((n) => !n.read).length,
  markRead: (id) => set((s) => ({ items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
  markAllRead: () => set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) })),
  remove: (id) => set((s) => ({ items: s.items.filter((n) => n.id !== id) })),
  push: (n) =>
    set((s) => ({
      items: [
        {
          ...n,
          id: `n_${Math.random().toString(36).slice(2, 9)}`,
          createdAt: new Date().toISOString(),
          read: false,
        },
        ...s.items,
      ],
    })),
}));
