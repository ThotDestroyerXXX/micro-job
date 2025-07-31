import {
  dayEnum,
  experienceLevel,
  jobCategories,
  jobType,
  locationType,
  paymentType,
  preferredPaymentMethod,
} from "@/db/schema";
import { z } from "zod";

export const jobSchema = z
  .object({
    title: z.string().min(1, "Job title is required"),
    category: z.enum(jobCategories.enumValues, "Job category is required"),
    job_type: z.enum(jobType.enumValues, "Job type is required"),
    short_description: z
      .string()
      .min(10, "Short description must be at least 10 characters"),
    description: z
      .string()
      .min(20, "Job description must be at least 20 characters"),
    location_type: z.enum(locationType.enumValues, "Location type is required"),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    start_date: z.date().nonoptional("Start date is required"),
    end_date: z.date().nonoptional("End date is required"),
    schedule: z
      .array(
        z
          .object({
            day: z.enum(dayEnum.enumValues, "Day is required"),
            start_time: z.iso.time("Start time is required"),
            end_time: z.iso.time("End time is required"),
          })
          .refine((entry) => entry.start_time < entry.end_time, {
            message: "Start time must be before end time",
            path: ["end_time"],
          })
      )
      .nonempty("At least one schedule entry is required"),
    required_skills: z.array(z.string().min(1, "Skill is required")),
    experience_level: z.enum(
      experienceLevel.enumValues,
      "Experience level is required"
    ),
    requirements: z.string().optional(),
    pay_amount: z.number().min(0, "Pay amount must be a positive number"),
    pay_type: z.enum(paymentType.enumValues, "Pay type is required"),
    preferred_payment_method: z.enum(
      preferredPaymentMethod.enumValues,
      "Preferred payment method is required"
    ),
    workers_needed: z.number().min(1, "At least one worker is required"),
    is_visible: z.boolean().default(true).nonoptional(),
    expires_at: z.date().nonoptional("Expiration date is required"),
    is_active: z.boolean().default(true).nonoptional(),
    image: z.file().optional(),
  })
  .refine((data) => data.start_date <= data.end_date, {
    message: "Start date must be before or the same as end date",
    path: ["end_date"],
  })
  .refine((data) => data.expires_at > new Date(), {
    message: "Expiration date must be in the future",
    path: ["expires_at"],
  });

export type JobFormData = z.infer<typeof jobSchema>;

export const JOB_FORM_FIELDS = [
  {
    name: "title" as const,
    label: "Job Title",
    placeholder: "Software Engineer",
    type: "text",
  },
  {
    name: "category" as const,
    label: "Category",
    placeholder: "Development",
    type: "text",
  },
  {
    name: "job_type" as const,
    label: "Job Type",
    options: jobType.enumValues.map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })),
    placeholder: "Select job type",
    type: "select",
  },
  {
    name: "short_description" as const,
    label: "Short Description",
    placeholder: "Briefly describe the job...",
    type: "textarea",
  },
  {
    name: "description" as const,
    label: "Description",
    placeholder: "Detailed job description...",
    type: "textarea",
  },
  {
    name: "location_type" as const,
    label: "Location Type",
    options: locationType.enumValues.map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })),
    placeholder: "Select location type",
    type: "select",
  },
  {
    name: "address" as const,
    label: "Address",
    placeholder: "123 Main St, City, Country",
    type: "text",
  },
  {
    name: "latitude" as const,
    label: "Latitude",
    placeholder: "-37.8136",
    type: "number",
  },
  {
    name: "longitude" as const,
    label: "Longitude",
    placeholder: "144.9631",
    type: "number",
  },
  {
    name: "start_date" as const,
    label: "Start Date",
    placeholder: "Select start date",
    type: "date",
  },
  {
    name: "end_date" as const,
    label: "End Date",
    placeholder: "Select end date",
    type: "date",
  },
  {
    name: "schedule" as const,
    label: "Schedule",
    placeholder: "Select schedule",
    type: "schedule", // Custom component for schedule
  },
  {
    name: "required_skills" as const,
    label: "Required Skills",
    placeholder: "e.g. JavaScript, React, Node.js",
    type: "text",
  },
  {
    name: "experience_level" as const,
    label: "Experience Level",
    options: experienceLevel.enumValues.map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })),
    placeholder: "Select experience level",
    type: "select",
  },
  {
    name: "requirements" as const,
    label: "Requirements",
    placeholder: "e.g. Bachelor's degree in Computer Science",
    type: "text",
  },
  {
    name: "preferred_payment_method" as const,
    label: "Preferred Payment Method",
    options: preferredPaymentMethod.enumValues.map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })),
    placeholder: "Select payment method",
    type: "select",
  },
  {
    name: "workers_needed" as const,
    label: "Workers Needed",
    placeholder: "1",
    type: "number",
  },
  {
    name: "pay_amount" as const,
    label: "Pay Amount",
    placeholder: "100.00",
    type: "number",
  },
  {
    name: "pay_type" as const,
    label: "Pay Type",
    options: paymentType.enumValues.map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })),
    placeholder: "Select pay type",
    type: "select",
  },
  {
    name: "expires_at" as const,
    label: "Expires At",
    placeholder: "Select expiration date",
    type: "date",
  },
] as const;

export const jobApplicationSchema = z.object({
  coverLetter: z
    .string()
    .min(20, "Cover letter must be at least 20 characters")
    .max(1000, "Cover letter must not exceed 1000 characters"),
});

export type JobApplicationData = z.infer<typeof jobApplicationSchema>;

export const JOB_APPLICATION_FORM_FIELDS = [
  {
    name: "coverLetter" as const,
    label: "Cover Letter",
    placeholder: "Tell the employer why you're interested in this job...",
    type: "textarea",
  },
] as const;
