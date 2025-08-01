import { getTimeAgoNumber } from "@/lib/utils";
import { differenceInHours } from "date-fns";

export type JobStatus = "active" | "completed" | "expired";

export interface JobStatusInfo {
  status: JobStatus;
  color: string;
}

export function getJobStatus(
  expiresAt: string | null,
  endDate: string | null,
  acceptedCount: number
): JobStatusInfo {
  // Job is active if not yet expired
  if (differenceInHours(new Date(expiresAt ?? ""), new Date()) >= 0) {
    return {
      status: "active",
      color: "bg-green-100 text-green-800 border-green-200",
    };
  }

  // Job is completed if past end date and has accepted applications
  if (
    differenceInHours(new Date(endDate ?? ""), new Date()) < 0 &&
    acceptedCount > 0
  ) {
    return {
      status: "completed",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    };
  }

  // Job is expired if past expiration date and no accepted applications
  if (
    differenceInHours(new Date(expiresAt ?? ""), new Date()) < 0 &&
    acceptedCount <= 0
  ) {
    return {
      status: "expired",
      color: "bg-red-100 text-red-800 border-red-200",
    };
  }

  // Default fallback
  return {
    status: "expired",
    color: "bg-gray-100 text-gray-800 border-gray-200",
  };
}

export function getStatusIcon(status: JobStatus) {
  switch (status) {
    case "active":
      return "🟢";
    case "completed":
      return "✅";
    case "expired":
      return "⏰";
    default:
      return "⚪";
  }
}

export const getApplicationStatusColor = (
  status: string,
  start_date: string | Date,
  end_date: string | Date
) => {
  if (status === "applied") {
    return { status: "applied", color: "bg-blue-100 text-blue-800" };
  }
  if (status === "accepted" && getTimeAgoNumber(start_date) < 0) {
    return { status: "accepted", color: "bg-green-100 text-green-800" };
  }
  if (status === "rejected") {
    return { status: "rejected", color: "bg-red-100 text-red-800" };
  }
  if (
    status === "accepted" &&
    getTimeAgoNumber(end_date) < 0 &&
    getTimeAgoNumber(start_date) >= 0
  ) {
    return { status: "in progress", color: "bg-yellow-100 text-yellow-800" };
  }
  if (status === "accepted" && getTimeAgoNumber(end_date) >= 0) {
    return { status: "completed", color: "bg-purple-100 text-purple-800" };
  } else {
    return { status: "unknown", color: "bg-gray-100 text-gray-800" };
  }
};
