import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db from "@/db";
import { z } from "zod";
import { job, job_favorite, user } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { jobSchema } from "../config/job.config";
import { time } from "drizzle-orm/pg-core";
import { and, eq } from "drizzle-orm";

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

  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) {
      throw new Error("User is not authenticated.");
    }

    const jobs = await db
      .select({
        job: job,
        user: user,
        isSaved: job_favorite.id,
      })
      .from(job)
      .innerJoin(user, eq(job.userId, user.id))
      .leftJoin(
        job_favorite,
        and(eq(job_favorite.jobId, job.id), eq(job_favorite.userId, ctx.userId))
      )
      .execute();

    return jobs.map((item) => ({
      ...item,
      isSaved: !!item.isSaved, // Convert to boolean
    }));
  }),

  toogleSaveJob: protectedProcedure
    .input(z.object({ jobId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.userId) {
        throw new Error("User is not authenticated.");
      }
      const { jobId } = input;

      // Check if the job is already saved
      const existingFavorite = await db
        .select()
        .from(job_favorite)
        .where(
          and(
            eq(job_favorite.userId, ctx.userId),
            eq(job_favorite.jobId, jobId)
          )
        )
        .execute();

      if (existingFavorite.length > 0) {
        // If it exists, unsave the job
        await db
          .delete(job_favorite)
          .where(
            and(
              eq(job_favorite.userId, ctx.userId),
              eq(job_favorite.jobId, jobId)
            )
          )
          .execute();
        return { jobId, message: "Job unsaved successfully" };
      }

      await db
        .insert(job_favorite)
        .values({
          id: uuidv4(),
          userId: ctx.userId,
          jobId: jobId,
        })
        .execute();
      return { jobId, message: "Job saved successfully" };
    }),
});
