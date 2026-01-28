import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

export function formatDate(dateString: string, formatStr: string = "yyyy년 MM월 dd일"): string {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr, { locale: ko });
  } catch {
    return dateString;
  }
}

export function formatDateShort(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "d MMM yyyy", { locale: ko });
  } catch {
    return dateString;
  }
}

export function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case "news":
      return "bg-primary";
    case "research":
      return "bg-accent-blue";
    case "commentary":
      return "bg-accent-green";
    default:
      return "bg-gray-600";
  }
}

export function getCategoryLabel(category: string): string {
  switch (category.toLowerCase()) {
    case "news":
      return "뉴스";
    case "research":
      return "연구";
    case "commentary":
      return "논평";
    default:
      return category;
  }
}
