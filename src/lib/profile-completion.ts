import { Session } from "@/lib/auth";

/**
 * Calculate profile completion percentage based on filled fields
 * Total trackable fields: 10
 */
export function calculateProfileCompletion(user: Session["user"]): number {
  if (!user) return 0;

  const profileFields = [
    user.name, // 1. Name (required, should always be present)
    user.email, // 2. Email (required, should always be present)
    user.image, // 3. Profile image
    user.bio, // 4. Bio/description
    user.location, // 5. Location
    user.phoneNumber, // 6. Phone number
    user.username, // 7. Username
    user.skills && user.skills.length > 0 ? user.skills : null, // 8. Skills array
    user.latitude, // 9. Latitude (for precise location)
    user.longitude, // 10. Longitude (for precise location)
  ];

  // Count non-null, non-undefined, non-empty values
  const completedFields = profileFields.filter((field) => {
    if (field === null || field === undefined) return false;
    if (typeof field === "string" && field.trim() === "") return false;
    if (Array.isArray(field) && field.length === 0) return false;
    return true;
  }).length;

  // Calculate percentage (round to nearest integer)
  const percentage = Math.round((completedFields / profileFields.length) * 100);

  return Math.min(percentage, 100); // Cap at 100%
}

/**
 * Get list of missing profile fields for completion suggestions
 */
export function getMissingProfileFields(user: Session["user"]): string[] {
  if (!user) return [];

  const fieldChecks = [
    { field: user.image, name: "Profile Photo" },
    { field: user.bio, name: "Bio" },
    { field: user.location, name: "Location" },
    { field: user.phoneNumber, name: "Phone Number" },
    { field: user.username, name: "Username" },
    {
      field: user.skills && user.skills.length > 0 ? user.skills : null,
      name: "Skills",
    },
    { field: user.latitude, name: "Precise Location" },
    { field: user.longitude, name: "Precise Location" },
  ];

  return (
    fieldChecks
      .filter(({ field }) => {
        if (field === null || field === undefined) return true;
        if (typeof field === "string" && field.trim() === "") return true;
        if (Array.isArray(field) && field.length === 0) return true;
        return false;
      })
      .map(({ name }) => name)
      // Remove duplicate "Precise Location" entries
      .filter((name, index, arr) => arr.indexOf(name) === index)
  );
}

export function progressColor(percentage: number): string {
  if (percentage < 33) return "bg-red-500";
  if (percentage < 66) return "bg-yellow-500";
  return "bg-green-500";
}
