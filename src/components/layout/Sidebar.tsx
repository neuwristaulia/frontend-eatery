"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Coffee, ShoppingBag, ReceiptText, User, Store, LogOut, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user as any;
  const isGuest = status === "unauthenticated";

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Menu", href: "/menu", icon: Coffee },
    { name: "Cart", href: "/cart", icon: ShoppingBag },
    { name: "Orders", href: "/orders", icon: ReceiptText },
  ];

  if (!isGuest) {
    navItems.push({ name: "Profile", href: "/profile", icon: User });
  }

  if (pathname === "/login") return null;

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 border-r border-border bg-card/50 backdrop-blur-xl z-40">
      <div className="p-6 flex items-center space-x-3 mb-8">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Store className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">Kopitiam</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-colors font-medium text-sm",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute inset-0 bg-primary rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={cn("w-5 h-5 transition-transform", isActive && "scale-110")}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto space-y-2">
        {!isGuest ? (
          <>
            <div className="bg-muted p-4 rounded-xl flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/20">
                {user?.image ? (
                  <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{user?.name?.charAt(0) || "C"}</span>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.name || "Customer"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.points || 0} pts</p>
              </div>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors group"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </>
        ) : (
          <>
            <div className="bg-muted p-4 rounded-xl flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold">
                G
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">Guest</p>
                <p className="text-xs text-muted-foreground truncate">Not signed in</p>
              </div>
            </div>
            <Link href="/login" className="block">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-primary hover:bg-primary/10 transition-colors group">
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span className="font-medium text-sm">Sign In</span>
              </button>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
