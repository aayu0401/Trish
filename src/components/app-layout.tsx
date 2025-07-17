import type { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
