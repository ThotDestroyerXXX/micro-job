import { Briefcase, CheckCircle, Users, Clock, LucideIcon } from "lucide-react";

export interface StatConfig {
  icon: LucideIcon;
  label: string;
  colorClass: "blue" | "green" | "purple" | "orange";
  key: keyof SummaryData;
}

export interface SummaryData {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  pendingReview: number;
}

export const SUMMARY_STATS: StatConfig[] = [
  {
    icon: Briefcase,
    label: "Total Jobs",
    colorClass: "blue",
    key: "totalJobs",
  },
  {
    icon: CheckCircle,
    label: "Active Jobs",
    colorClass: "green",
    key: "activeJobs",
  },
  {
    icon: Users,
    label: "Total Applicants",
    colorClass: "purple",
    key: "totalApplicants",
  },
  {
    icon: Clock,
    label: "Pending Review",
    colorClass: "orange",
    key: "pendingReview",
  },
];
