import {
  pgTable,
  text,
  timestamp,
  boolean,
  decimal,
  pgEnum,
  jsonb,
  date,
  integer,
  time,
} from "drizzle-orm/pg-core";

export const dayEnum = pgEnum("day", [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

export const jobType = pgEnum("job_type", [
  "One-time",
  "Recurring",
  "Hourly",
  "Fixed Price",
  "Project-based",
]);

export const locationType = pgEnum("location_type", [
  "remote",
  "on-site",
  "hybrid",
]);

export const experienceLevel = pgEnum("experience_level", [
  "Entry Level",
  "Intermediate",
  "Expert",
  "Any Level",
]);

export const paymentType = pgEnum("payment_type", [
  "Hourly",
  "Fixed Price",
  "Commission-based",
]);

export const preferredPaymentMethod = pgEnum("preferred_payment_method", [
  "Cash",
  "Bank Transfer",
  "PayPal",
  "Digital Wallet",
  "Platform Wallet",
]);

export const jobCategories = pgEnum("job_categories", [
  "Delivery & Transportation",
  "Cleaning & Maintenance",
  "Tutoring & Education",
  "Pet Care",
  "Moving & Packing",
  "Data Entry & Admin",
  "Handyman & Repairs",
  "Cooking & Catering",
  "Photography & Design",
  "Other",
]);

export const applicationStatus = pgEnum("application_status", [
  "applied",
  "accepted",
  "in progress",
  "completed",
  "cancelled",
  "rejected",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  phoneNumber: text("phone_number").unique(),
  phoneNumberVerified: boolean("phone_number_verified"),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  bio: text("bio"),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  location: text("location"),
  latitude: decimal("latitude", { precision: 10, scale: 6 }),
  longitude: decimal("longitude", { precision: 10, scale: 6 }),
  isAcceptingJobs: boolean("is_accepting_jobs").$defaultFn(() => true),
  skills: jsonb("skills").$type<{ name: string; years: number }[]>(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const user_availability = pgTable("user_availability", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  day_of_week: dayEnum("day_of_week").notNull(),
  isBusy: boolean("is_busy").$defaultFn(() => true),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const job = pgTable("job", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title"),
  category: jobCategories("category"),
  job_type: jobType("job_type"),
  short_description: text("short_description"),
  description: text("description"),
  location_type: locationType("location_type"),
  address: text("address"),
  latitude: decimal("latitude", { precision: 10, scale: 6 }),
  longitude: decimal("longitude", { precision: 10, scale: 6 }),
  start_date: date("start_date"),
  end_date: date("end_date"),
  schedule: jsonb("schedule").$type<
    {
      day: (typeof dayEnum.enumValues)[number];
      startTime: typeof time & { precision: 4 };
      endTime: typeof time & { precision: 4 };
    }[]
  >(),
  required_skills: jsonb("required_skills").$type<string[]>(),
  experience_level: experienceLevel("experience_level"),
  requirements: text("requirements"),
  pay_amount: decimal("pay_amount", { precision: 10, scale: 2 }),
  pay_type: paymentType("pay_type"),
  preferred_payment_method: preferredPaymentMethod("preferred_payment_method"),
  workers_needed: integer("workers_needed").default(1),
  is_visible: boolean("is_visible").default(true),
  expires_at: date("expires_at"),
  is_active: boolean("is_active").default(true),
  image: text("image"),

  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const job_application = pgTable("job_application", {
  id: text("id").primaryKey(),
  jobId: text("job_id")
    .notNull()
    .references(() => job.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: applicationStatus("status").default("applied"),
  applied_at: timestamp("applied_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  accepted_at: timestamp("accepted_at"),
  started_at: timestamp("started_at"),
  completed_at: timestamp("completed_at"),
  cancelled_at: timestamp("cancelled_at"),
  employer_rating: integer("employer_rating"),
  worker_rating: integer("worker_rating"),
  employer_review: text("employer_review"),
  worker_review: text("worker_review"),
  payment_confirmed: boolean("payment_confirmed").default(false),
  completion_files: jsonb("completion_files").$type<string[]>(),
  created_at: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updated_at: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});
