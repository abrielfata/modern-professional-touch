import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "pending" | "verified" | "rejected" | "info" | "warning";
  delay?: number;
  subtitle?: string;
}

const variantStyles = {
  default: {
    iconBg: "bg-secondary",
    iconColor: "text-foreground",
    border: "border-border",
  },
  pending: {
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    border: "border-warning/30",
  },
  verified: {
    iconBg: "bg-success/10",
    iconColor: "text-success",
    border: "border-success/30",
  },
  rejected: {
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    border: "border-destructive/30",
  },
  info: {
    iconBg: "bg-info/10",
    iconColor: "text-info",
    border: "border-info/30",
  },
  warning: {
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    border: "border-warning/30",
  },
};

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  variant = "default", 
  delay = 0,
  subtitle 
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-lg",
        styles.border
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {value}
          </h3>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn("rounded-xl p-3", styles.iconBg)}>
          <Icon className={cn("h-5 w-5", styles.iconColor)} />
        </div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/20 pointer-events-none" />
    </motion.div>
  );
}
