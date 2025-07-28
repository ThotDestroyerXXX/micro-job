import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db from "@/db";
import { z } from "zod";
import { job, job_favorite, job_application, user } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { jobSchema } from "../config/job.config";
import { time } from "drizzle-orm/pg-core";
import { and, eq, count } from "drizzle-orm";
import { redirect } from "next/navigation";

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
        applicationCount: count(job_application.id),
      })
      .from(job)
      .innerJoin(user, eq(job.userId, user.id))
      .leftJoin(
        job_favorite,
        and(eq(job_favorite.jobId, job.id), eq(job_favorite.userId, ctx.userId))
      )
      .leftJoin(job_application, eq(job_application.jobId, job.id))
      .groupBy(job.id, user.id, job_favorite.id)
      .execute();

    // Get user statistics for all unique users
    const userIds = [...new Set(jobs.map((job) => job.user.id))];

    const userStats = await Promise.all(
      userIds.map(async (userId) => {
        const [postedJobs, completedJobs] = await Promise.all([
          db
            .select({ count: count() })
            .from(job)
            .where(eq(job.userId, userId))
            .execute(),
          db
            .select({ count: count() })
            .from(job_application)
            .where(
              and(
                eq(job_application.userId, userId),
                eq(job_application.status, "completed")
              )
            )
            .execute(),
        ]);

        return {
          userId,
          totalPostedJobs: postedJobs[0]?.count || 0,
          totalCompletedJobs: completedJobs[0]?.count || 0,
        };
      })
    );

    const userStatsMap = new Map(userStats.map((stat) => [stat.userId, stat]));

    return jobs.map((item) => ({
      ...item,
      isSaved: !!item.isSaved, // Convert to boolean
      applicationCount: item.applicationCount || 0,
      user: {
        ...item.user,
        totalPostedJobs: userStatsMap.get(item.user.id)?.totalPostedJobs || 0,
        totalCompletedJobs:
          userStatsMap.get(item.user.id)?.totalCompletedJobs || 0,
      },
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

  getOne: protectedProcedure
    .input(z.object({ jobId: z.string() }))
    .query(async ({ input, ctx }) => {
      if (!ctx.userId) {
        redirect("/login"); // Redirect to login if user is not authenticated
      }
      const { jobId } = input;

      // Get job details with user and saved status
      const jobDetails = await db
        .select({
          job: job,
          user: user,
          isSaved: job_favorite.id,
        })
        .from(job)
        .innerJoin(user, eq(job.userId, user.id))
        .leftJoin(
          job_favorite,
          and(
            eq(job_favorite.jobId, job.id),
            eq(job_favorite.userId, ctx.userId)
          )
        )
        .where(eq(job.id, jobId))
        .execute();

      if (jobDetails.length === 0) {
        throw new Error("Job not found");
      }

      const jobOwnerUserId = jobDetails[0].user.id;

      // Get application count for this job
      const applicationCount = await db
        .select({ count: count() })
        .from(job_application)
        .where(eq(job_application.jobId, jobId))
        .execute();

      // Get total jobs posted by the job owner
      const postedJobsCount = await db
        .select({ count: count() })
        .from(job)
        .where(eq(job.userId, jobOwnerUserId))
        .execute();

      // Get total jobs completed by the job owner (as a worker)
      const completedJobsCount = await db
        .select({ count: count() })
        .from(job_application)
        .where(
          and(
            eq(job_application.userId, jobOwnerUserId),
            eq(job_application.status, "completed")
          )
        )
        .execute();

      return {
        ...jobDetails[0],
        isSaved: !!jobDetails[0].isSaved, // Convert to boolean
        applicationCount: applicationCount[0]?.count || 0,
        user: {
          ...jobDetails[0].user,
          totalPostedJobs: postedJobsCount[0]?.count || 0,
          totalCompletedJobs: completedJobsCount[0]?.count || 0,
        },
      };
    }),
});
