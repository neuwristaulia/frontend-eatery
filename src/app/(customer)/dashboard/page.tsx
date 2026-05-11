"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { recentOrders, rewards } from "@/lib/dummy-data";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Award, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const user = session?.user as any;
  const isGuest = status === "unauthenticated";

  const activeOrder = recentOrders.find(o => o.status !== "completed");
  const pastOrders = recentOrders.filter(o => o.status === "completed");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  if (status === "loading") return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="flex justify-between items-center">
        <div>
          <p className="text-muted-foreground text-sm">{isGuest ? "Welcome," : "Welcome back,"}</p>
          <h1 className="text-2xl font-bold">{isGuest ? "Guest" : user?.name || "Customer"}</h1>
        </div>
        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold text-lg overflow-hidden border-2 border-primary/20">
          {user?.image ? (
            <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
          ) : isGuest ? (
            <span className="text-sm">G</span>
          ) : (
            <span>{user?.name?.charAt(0) || "C"}</span>
          )}
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Points & Quick Order */}
        <div className="space-y-8">
          {/* Points Card */}
          <motion.div variants={itemVariants}>
            {!isGuest ? (
              <Card className="bg-gradient-to-br from-primary to-[#4a0818] border-none text-primary-foreground overflow-hidden relative">
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-primary-foreground/80 text-sm font-medium mb-1">Total Points</p>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-4xl font-bold tracking-tight">{user?.points || 0}</span>
                        <span className="text-sm">pts</span>
                      </div>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between text-xs mb-2 text-primary-foreground/80">
                      <span>Silver Tier</span>
                      <span>{1500 - (user?.points || 0)} pts to Gold</span>
                    </div>
                    <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((user?.points || 0) / 1500) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-muted border-dashed border-2 border-border/50 text-foreground overflow-hidden relative h-[180px] flex flex-col items-center justify-center text-center">
                <CardContent className="p-6">
                  <Award className="w-10 h-10 mx-auto text-primary/50 mb-3" />
                  <h3 className="font-bold text-lg mb-1">Sign in to Earn Points</h3>
                  <p className="text-sm text-muted-foreground mb-4">Get rewards and exclusive promos.</p>
                  <Link href="/login">
                    <Button variant="outline" className="rounded-full">Sign In</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Quick Order / Call to action */}
          <motion.div variants={itemVariants}>
            <Link href="/menu">
              <Card className="bg-secondary text-secondary-foreground border-none hover:bg-secondary/90 transition-colors">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl mb-1">Hungry?</h3>
                    <p className="text-sm text-secondary-foreground/80">Order your favorites now</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-full">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Active Order & Rewards */}
        <div className="space-y-8">
          {/* Active Order Status */}
          {activeOrder ? (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <h2 className="text-lg font-bold">Active Order</h2>
              </div>
              <Card className="border-primary/20 bg-primary/5 transition-all hover:bg-primary/10">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{activeOrder.id}</p>
                    <p className="text-sm text-muted-foreground capitalize">Status: {activeOrder.status}</p>
                  </div>
                  <Link href={`/orders/${activeOrder.id}`}>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20">
                      <ChevronRight className="w-5 h-5 text-primary" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <h2 className="text-lg font-bold">Active Order</h2>
              </div>
              <Card className="border-dashed border-2 border-border/50 bg-transparent h-[104px] flex items-center justify-center">
                <CardContent className="p-0 text-center text-muted-foreground">
                  <p className="text-sm">No active orders right now.</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Available Rewards */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <h2 className="text-lg font-bold">Rewards</h2>
              {!isGuest && (
                <Button variant="ghost" size="sm" className="h-auto p-0 text-primary hover:bg-transparent">
                  View All
                </Button>
              )}
            </div>
            {isGuest ? (
              <Card className="border-dashed border-2 border-border/50 bg-transparent h-[142px] flex items-center justify-center">
                <CardContent className="p-0 text-center text-muted-foreground">
                  <Award className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Sign in to view your rewards.</p>
                </CardContent>
              </Card>
            ) : rewards.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {rewards.slice(0, 2).map((reward) => (
                  <Card key={reward.id} className="bg-card hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <Award className="w-6 h-6 text-primary mb-3" />
                      <h3 className="font-bold text-sm leading-tight mb-1">{reward.name}</h3>
                      <p className="text-xs font-semibold text-primary/80">{reward.pointsRequired} pts</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2 border-border/50 bg-transparent h-[142px] flex items-center justify-center">
                <CardContent className="p-0 text-center text-muted-foreground">
                  <Award className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No rewards available yet. Keep earning points!</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
      
    </motion.div>
  );
}
