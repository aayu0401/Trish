"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, MessageSquare, User, Heart, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/browse", icon: Flame, label: "Browse" },
  { href: "/likes", icon: Heart, label: "Likes" },
  { href: "/matches", icon: MessageSquare, label: "Chats" },
  { href: "/gifts", icon: Gift, label: "Gifts" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background/70 backdrop-blur-lg border-t z-50 md:h-16">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link href={item.href} key={item.href} legacyBehavior passHref>
              <a className="flex flex-col items-center justify-center w-full h-full text-muted-foreground transition-colors duration-300 ease-in-out group">
                <div className={cn("p-3 rounded-full transition-all duration-300", isActive ? "bg-primary/20" : "")}>
                    <item.icon
                    className={cn(
                        "h-7 w-7 transition-all duration-300",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                    />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-300",
                     isActive ? "text-primary font-semibold" : "group-hover:text-foreground"
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
