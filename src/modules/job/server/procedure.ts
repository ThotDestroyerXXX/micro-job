import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db from "@/db";
import { z } from "zod";
import { job } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { jobSchema } from "../config/job.config";
import { time } from "drizzle-orm/pg-core";

export const jobRouter = createTRPCRouter({
  createJob: protectedProcedure
    .input(
      jobSchema.extend({
        image: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        title,
        category,
        job_type,
        short_description,
        description,
        location_type,
        address,
        latitude,
        longitude,
        start_date,
        end_date,
        schedule,
        required_skills,
        experience_level,
        requirements,
        pay_amount,
        pay_type,
        preferred_payment_method,
        workers_needed,
        is_visible,
        expires_at,
        is_active,
        image,
      } = input;
      const jobId = uuidv4();
      if (!ctx.userId) {
        throw new Error("User is not authenticated.");
      }
      await db
        .insert(job)
        .values({
          id: jobId,
          userId: ctx.userId,
          title,
          category,
          job_type,
          short_description,
          description,
          location_type,
          address,
          latitude: latitude?.toString(),
          longitude: longitude?.toString(),
          start_date: start_date?.toISOString().split("T")[0],
          end_date: end_date?.toISOString().split("T")[0],
          schedule: schedule.map((s) => ({
            day: s.day,
            startTime: s.start_time as unknown as typeof time & {
              precision: 4;
            },
            endTime: s.end_time as unknown as typeof time & { precision: 4 },
          })),
          required_skills: required_skills,
          experience_level,
          requirements,
          pay_amount: pay_amount.toString(),
          pay_type,
          preferred_payment_method,
          workers_needed: workers_needed,
          is_visible,
          expires_at: expires_at.toISOString().split("T")[0],
          is_active,
          image: image,
        })
        .execute();
      return { jobId };
    }),
});
