import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const LOGIN_FORM_FIELDS = [
  {
    name: "username" as const,
    label: "Username",
    placeholder: "johndoe",
    type: "text",
  },
  {
    name: "password" as const,
    label: "Password",
    placeholder: "••••••••",
    type: "password",
  },
] as const;

export const registerSchema = loginSchema
  .extend({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    confirmPassword: z.string(),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    role: z.enum(["worker", "seeker"], {
      message: "Please select your role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const REGISTER_FORM_FIELDS = [
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
    name: "email" as const,
    label: "Email",
    placeholder: "johndoe@example.com",
    type: "email",
  },
  ...LOGIN_FORM_FIELDS,
  {
    name: "confirmPassword" as const,
    label: "Confirm Password",
    placeholder: "••••••••",
    type: "password",
  },
  {
    name: "phoneNumber" as const,
    label: "Phone Number",
    placeholder: "+1234567890",
    type: "tel",
  },
] as const;
