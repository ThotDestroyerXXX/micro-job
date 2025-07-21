import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, { error: "Username must be at least 5 characters long" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
});

export const registerSchema = loginSchema
  .extend({
    firstName: z.string().min(1, { error: "First name is required" }),
    lastName: z.string().min(1, { error: "Last name is required" }),
    username: z
      .string()
      .min(5, { error: "Username must be at least 5 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm password must be at least 8 characters long" }),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.confirmPassword === data.password,
    {
      error: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
