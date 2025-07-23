import { z } from "zod";

export const basicInformationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().optional(),
  location: z.string().optional(),
});
export type BasicInformationFormData = z.infer<typeof basicInformationSchema>;
export const BASIC_INFORMATION_FORM_FIELDS = [
  {
    name: "firstName" as const,
    label: "First Name",
    placeholder: "John",
    type: "text",
  },
  {
    name: "lastName" as const,
    label: "Last Name",
    placeholder: "Doe",
    type: "text",
  },
  {
    name: "username" as const,
    label: "Username",
    placeholder: "johndoe",
    type: "text",
  },
  {
    name: "bio" as const,
    label: "Bio",
    placeholder: "Tell us about yourself...",
    type: "textarea",
  },
  {
    name: "location" as const,
    label: "Location",
    placeholder: "City, Country",
    type: "text",
  },
] as const;
