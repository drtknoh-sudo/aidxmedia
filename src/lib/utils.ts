import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, formatStr: string = "MMMM d, yyyy"): string {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr, { locale: enUS });
  } catch {
    return dateString;
  }
}

export function formatDateShort(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "d MMM yyyy", { locale: enUS });
  } catch {
    return dateString;
  }
}

export function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case "news":
      return "bg-primary";
    case "research":
      return "bg-accent-teal";
    case "commentary":
      return "bg-accent-green";
    default:
      return "bg-gray-600";
  }
}

export function getCategoryLabel(category: string): string {
  switch (category.toLowerCase()) {
    case "news":
      return "News";
    case "research":
      return "Research";
    case "commentary":
      return "Commentary";
    default:
      return category;
  }
}
