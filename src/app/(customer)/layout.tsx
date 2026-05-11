"use client";

import * as React from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { useStore } from "@/store/useStore";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64 relative min-h-screen">
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-full pb-20 md:pb-8"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
      <BottomNav />
    </div>
  );
}
