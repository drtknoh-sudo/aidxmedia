"use client";

import { cn } from "@/lib/utils";
import { Flame, Clock, TrendingUp } from "lucide-react";

type SortOption = "hot" | "new" | "top";

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: "hot", label: "Hot", icon: <Flame size={16} /> },
  { value: "new", label: "New", icon: <Clock size={16} /> },
  { value: "top", label: "Top", icon: <TrendingUp size={16} /> },
];

export function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            value === option.value
              ? "bg-white text-orange-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
