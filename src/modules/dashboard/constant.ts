import { Calendar, DollarSign, Eye, Plus, Search, User } from "lucide-react";

export const QUICK_ACTION_CONSTANTS = [
  {
    icon: Search,
    title: "Browse Jobs",
    description: "Find new opportunities",
    color: "from-blue-500 to-blue-600",
    link: "/job",
  },
  {
    icon: Plus,
    title: "Post a Job",
    description: "Hire someone for your task",
    color: "from-green-500 to-green-600",
    link: "/job/create",
  },
  {
    icon: User,
    title: "Update Profile",
    description: "Keep your profile current",
    color: "from-purple-500 to-purple-600",
    link: "/profile",
  },
  {
    icon: Calendar,
    title: "Manage Job Applications",
    description: "Track applications from your jobs",
    color: "from-orange-500 to-orange-600",
    link: "/job/manage-applications",
  },
  {
    icon: Eye,
    title: "View Applications",
    description: "Check application status",
    color: "from-teal-500 to-teal-600",
    link: "/applications",
  },
  {
    icon: DollarSign,
    title: "Earnings Report",
    description: "Track your income",
    color: "from-pink-500 to-pink-600",
    link: "/earnings",
  },
];
