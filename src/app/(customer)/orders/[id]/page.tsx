"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { recentOrders } from "@/lib/dummy-data";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowLeft, MapPin, CheckCircle2, Clock, ChefHat, PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const order = recentOrders.find(o => o.id === id) || recentOrders[0];

  const steps = [
    { status: "created", label: "Order Placed", icon: Clock },
    { status: "confirmed", label: "Confirmed", icon: CheckCircle2 },
    { status: "ready", label: "Preparing", icon: ChefHat },
    { status: "completed", label: "Completed", icon: PackageCheck },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background px-4 pt-8 pb-4 flex items-center space-x-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-center">Order {order.id}</h1>
        </div>
        <div className="w-10" />
      </div>

      <div className="p-4 space-y-6">
        {/* Status Tracker */}
        <Card className="border-border/50">
          <CardContent className="p-6">
            <h2 className="font-bold mb-6 text-lg text-center">Order Status</h2>
            <div className="relative">
              {/* Line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-muted" />
              
              <div className="space-y-6 relative">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  
                  return (
                    <div key={step.status} className="flex items-center space-x-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-colors",
                        isCurrent ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" :
                        isCompleted ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="w-6 h-6" />
                        {isCurrent && (
                          <motion.div
                            layoutId="active-step"
                            className="absolute inset-0 border-2 border-primary rounded-full"
                            initial={false}
                            animate={{ scale: 1.2, opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                        )}
                      </div>
                      <div>
                        <p className={cn("font-bold", isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground")}>
                          {step.label}
                        </p>
                        {isCurrent && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-xs text-muted-foreground mt-1"
                          >
                            We are currently processing this step.
                          </motion.p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-bold">Order Details</h3>
            <div className="space-y-2">
              {order.items.split(", ").map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">1x {item}</span>
                  <span>...</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">Rp {order.total.toLocaleString('id-ID')}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
