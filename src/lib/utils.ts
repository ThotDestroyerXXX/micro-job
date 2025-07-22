import { clsx, type ClassValue } from "clsx";
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
