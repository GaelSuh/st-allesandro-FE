"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { MobileBottomNav } from "@/components/dashboard/MobileNav";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { useAuthStore, useUIStore } from "@/stores";
import { Dialog, DialogContent } from "@/components/ui/Dialog";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebar = useUIStore((s) => s.setSidebar);
  const [mounted, setMounted] = useState(false);

  // Demo mode: if there's no user after Zustand persist hydrates,
  // sign the visitor in as the demo Student so every dashboard route
  // is immediately explorable. This runs synchronously on mount so
  // children mount with a non-null user.
  useEffect(() => {
    if (!useAuthStore.getState().user) {
      useAuthStore.getState().setRole("student");
    }
    setMounted(true);
  }, []);

  // Avoid rendering child pages until the auth store has been hydrated
  // and a user is present. Otherwise pages reading `user.*` directly will
  // throw during the very first client paint.
  const ready = mounted && !!user;

  return (
    <div className="flex min-h-dvh bg-surface-muted">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-0 h-dvh">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      <Dialog open={sidebarOpen} onOpenChange={setSidebar}>
        <DialogContent hideClose className="!fixed !left-0 !top-0 !bottom-0 !translate-x-0 !translate-y-0 !rounded-none !p-0 !max-w-[300px] !w-[300px] !max-h-full">
          <Sidebar mobile onClose={() => setSidebar(false)} />
        </DialogContent>
      </Dialog>

      <div className="flex flex-1 flex-col min-w-0">
        <Topbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 pb-24 lg:pb-8">
          {ready ? children : (
            <div className="space-y-6 animate-pulse" aria-busy>
              <div className="h-8 w-72 skeleton" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-28 skeleton rounded-2xl" />
                ))}
              </div>
              <div className="h-72 skeleton rounded-2xl" />
            </div>
          )}
        </main>
      </div>

      <MobileBottomNav />
      <CommandPalette />
    </div>
  );
}
