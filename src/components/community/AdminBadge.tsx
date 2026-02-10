"use client";

import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminBadgeProps {
  className?: string;
  size?: "sm" | "md";
}

export function AdminBadge({ className, size = "md" }: AdminBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold",
        "bg-gradient-to-r from-orange-500 to-red-500 text-white",
        size === "sm" ? "text-xs" : "text-xs",
        className
      )}
    >
      <Shield size={size === "sm" ? 10 : 12} />
      ADMIN
    </span>
  );
}
