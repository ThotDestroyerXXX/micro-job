import {
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  Eye,
  Edit,
  Copy,
  Trash2,
} from "lucide-react";

export const JOB_STATS_CONFIG = [
  {
    key: "pay_amount" as const,
    icon: DollarSign,
    colorClass: "green",
    label: "pay_type",
  },
  {
    key: "applicationCount" as const,
    icon: Users,
    colorClass: "blue",
    label: "Applications",
  },
  {
    key: "pendingCount" as const,
    icon: Clock,
    colorClass: "yellow",
    label: "Pending",
  },
  {
    key: "acceptedCount" as const,
    icon: CheckCircle,
    colorClass: "purple",
    label: "Accepted",
  },
];

export const DROPDOWN_ACTIONS = [
  {
    id: "view",
    label: "View Details",
    icon: Eye,
    className: "",
  },
  {
    id: "edit",
    label: "Edit Job",
    icon: Edit,
    className: "",
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: Copy,
    className: "",
  },
  {
    id: "delete",
    label: "Delete",
    icon: Trash2,
    className: "text-red-600 focus:text-red-600",
    separator: true,
  },
];

export const EXPIRATION_WARNING_DAYS = 7;
