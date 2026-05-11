"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Coffee, ShoppingBag, ReceiptText, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function BottomNav() {
  const pathname = usePathname();
  const { status } = useSession();
  const isGuest = status === "unauthenticated";

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Menu", href: "/menu", icon: Coffee },
    { name: "Cart", href: "/cart", icon: ShoppingBag },
    { name: "Orders", href: "/orders", icon: ReceiptText },
  ];

  if (!isGuest) {
    navItems.push({ name: "Profile", href: "/profile", icon: User });
  } else {
    navItems.push({ name: "Sign In", href: "/login", icon: User });
  }

  // Do not show bottom nav on login page or checkout flow
  if (pathname === "/login" || pathname.startsWith("/checkout")) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border pb-safe">
      <nav className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full space-y-1 text-xs transition-colors",
                isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 w-8 h-1 bg-primary rounded-b-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={cn("w-6 h-6 transition-transform", isActive && "scale-110")}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
