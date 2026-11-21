import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function formatTimeRemaining(deadlineString: string): { text: string; urgent: boolean; days: number } {
  const now = new Date().getTime();
  const deadline = new Date(deadlineString).getTime();
  const diffMs = deadline - now;

  if (diffMs <= 0) {
    return { text: "Expired", urgent: false, days: -1 };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days === 0) {
    return { text: `${hours} hours left`, urgent: true, days: 0 };
  }
  if (days <= 3) {
    return { text: `${days}d left`, urgent: true, days };
  }
  if (days <= 7) {
    return { text: `${days} days left`, urgent: false, days };
  }
  return { text: `${days} days left`, urgent: false, days };
}

export function getVerificationBadgeColor(status: string) {
  switch (status) {
    case "verified":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    case "pending_review":
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    case "rejected":
      return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/30";
  }
}
