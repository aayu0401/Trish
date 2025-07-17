"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Heart, User, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/browse", icon: Flame, label: "Browse" },
  { href: "/matches", icon: Heart, label: "Matches" },
  { href: "/wallet", icon: Wallet, label: "Wallet" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-lg border-t border-border shadow-t-lg z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.href} legacyBehavior passHref>
              <a className="flex flex-col items-center justify-center w-full h-full text-muted-foreground transition-colors duration-300 ease-in-out">
                <item.icon
                  className={cn(
                    "h-6 w-6 transition-all duration-300",
                    isActive ? "text-primary scale-110 -translate-y-1" : ""
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-300",
                     isActive ? "text-primary" : ""
                  )}
                >
                  {item.label}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
