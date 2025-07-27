import { clsx, type ClassValue } from "clsx";
import { differenceInDays, differenceInHours } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  const errorString = String(error);
  const colonIndex = errorString.indexOf(": ");

  if (colonIndex !== -1) {
    return errorString.substring(colonIndex + 2);
  }

  return errorString;
};

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Ensures consistent formatting
  });
}

export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function addressDisplay(location_type: string, address: string): string {
  if (location_type === "remote") {
    return "Remote";
  } else if (location_type === "hybrid") {
    return "Hybrid";
  }
  return address;
}

export function getRelativeTime(
  createdAt: string | Date,
  endDate?: string | Date
): string {
  const now = Date.now();
  const created = new Date(createdAt);
  const end = endDate ? new Date(endDate) : now;

  const hoursDiff = differenceInHours(end, created);

  if (hoursDiff < 24) {
    return `${hoursDiff}h ago`;
  } else {
    const daysDiff = differenceInDays(end, created);
    return `${daysDiff}d ago`;
  }
}

// For job duration (start_date to end_date) - SSR safe
export function getJobDuration(
  startDate: string | Date,
  endDate: string | Date
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const daysDiff = differenceInDays(end, start);

  if (daysDiff === 0) {
    return "Same day";
  } else if (daysDiff === 1) {
    return "1 day";
  } else {
    return `${daysDiff} days`;
  }
}

// For "time ago" display - Client-side only to prevent hydration issues
export function getTimeAgo(createdAt: string | Date): string {
  if (typeof window === "undefined") {
    // Return a static fallback for SSR
    return "Recently";
  }

  const now = new Date();
  const created = new Date(createdAt);

  const hoursDiff = differenceInHours(now, created);

  if (hoursDiff < 1) {
    return "Just now";
  } else if (hoursDiff < 24) {
    return `${hoursDiff}h ago`;
  } else {
    const daysDiff = differenceInDays(now, created);
    return `${daysDiff}d ago`;
  }
}
