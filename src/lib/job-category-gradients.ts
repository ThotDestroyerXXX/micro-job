import { jobCategories } from "@/db/schema";

// Type-safe mapping of job categories to their gradients
export const JOB_CATEGORY_GRADIENTS: Record<
  (typeof jobCategories.enumValues)[number],
  {
    gradient: string;
    color: string;
    icon?: string;
  }
> = {
  "Delivery & Transportation": {
    gradient: "from-blue-500 to-blue-600",
    color: "bg-blue-500",
    icon: "🚚",
  },
  "Cleaning & Maintenance": {
    gradient: "from-green-500 to-green-600",
    color: "bg-green-500",
    icon: "🧹",
  },
  "Tutoring & Education": {
    gradient: "from-purple-500 to-purple-600",
    color: "bg-purple-500",
    icon: "📚",
  },
  "Pet Care": {
    gradient: "from-pink-500 to-pink-600",
    color: "bg-pink-500",
    icon: "🐕",
  },
  "Moving & Packing": {
    gradient: "from-orange-500 to-orange-600",
    color: "bg-orange-500",
    icon: "📦",
  },
  "Data Entry & Admin": {
    gradient: "from-indigo-500 to-indigo-600",
    color: "bg-indigo-500",
    icon: "💻",
  },
  "Handyman & Repairs": {
    gradient: "from-yellow-500 to-yellow-600",
    color: "bg-yellow-500",
    icon: "🔧",
  },
  "Cooking & Catering": {
    gradient: "from-red-500 to-red-600",
    color: "bg-red-500",
    icon: "👨‍🍳",
  },
  "Photography & Design": {
    gradient: "from-teal-500 to-teal-600",
    color: "bg-teal-500",
    icon: "📸",
  },
  Other: {
    gradient: "from-gray-500 to-gray-600",
    color: "bg-gray-500",
    icon: "⚡",
  },
} as const;

// Helper function to get gradient for a category
export function getCategoryGradient(
  category: (typeof jobCategories.enumValues)[number]
) {
  return JOB_CATEGORY_GRADIENTS[category];
}

// Helper function to get all categories with their gradients
export function getAllCategoriesWithGradients() {
  return jobCategories.enumValues.map((category) => ({
    category,
    ...JOB_CATEGORY_GRADIENTS[category],
  }));
}

// Helper function for category selection components
export const CATEGORY_OPTIONS = jobCategories.enumValues.map((category) => ({
  value: category,
  label: category,
  gradient: JOB_CATEGORY_GRADIENTS[category].gradient,
  color: JOB_CATEGORY_GRADIENTS[category].color,
  icon: JOB_CATEGORY_GRADIENTS[category].icon,
}));
