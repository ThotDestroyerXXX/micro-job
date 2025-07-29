import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db from "@/db";
import { z } from "zod";
import { job, job_favorite, job_application, user } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { jobSchema } from "../config/job.config";
import { time } from "drizzle-orm/pg-core";
import { and, eq, count, gt, desc, lt } from "drizzle-orm";
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
      .where(gt(job.expires_at, new Date().toISOString().split("T")[0]))
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

  getOwnJobs: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) {
      throw new Error("User is not authenticated.");
    }
    const currentDate = new Date().toISOString().split("T")[0];

    // Get jobs with application counts
    const jobs = await db
      .select({
        job: job,
        applicationCount: count(job_application.id),
      })
      .from(job)
      .leftJoin(job_application, eq(job_application.jobId, job.id))
      .groupBy(job.id)
      .orderBy(desc(job.createdAt))
      .execute();

    // For each job, get accepted and pending counts
    const jobsWithCounts = await Promise.all(
      jobs.map(async (jobItem) => {
        const [acceptedCount, pendingCount] = await Promise.all([
          // Count accepted applications
          db
            .select({ count: count() })
            .from(job_application)
            .where(
              and(
                eq(job_application.jobId, jobItem.job.id),
                eq(job_application.status, "accepted")
              )
            )
            .execute(),

          // Count pending applications (status = "applied")
          db
            .select({ count: count() })
            .from(job_application)
            .where(
              and(
                eq(job_application.jobId, jobItem.job.id),
                eq(job_application.status, "applied")
              )
            )
            .execute(),
        ]);

        return {
          ...jobItem.job,
          applicationCount: jobItem.applicationCount || 0,
          acceptedCount: acceptedCount[0]?.count || 0,
          pendingCount: pendingCount[0]?.count || 0,
        };
      })
    );

    // Get summary statistics in parallel
    const [
      totalJobsCount,
      activeJobsCount,
      expiredJobsCount,
      totalApplicantsCount,
      pendingReviewCount,
    ] = await Promise.all([
      // Total jobs posted
      db
        .select({ count: count() })
        .from(job)
        .where(eq(job.userId, ctx.userId))
        .execute(),

      // Active jobs count
      db
        .select({ count: count() })
        .from(job)
        .where(and(eq(job.userId, ctx.userId), gt(job.expires_at, currentDate)))
        .execute(),

      // Expired jobs count
      db
        .select({ count: count() })
        .from(job)
        .where(and(eq(job.userId, ctx.userId), lt(job.expires_at, currentDate)))
        .execute(),

      // Total applicants across all jobs
      db
        .select({ count: count() })
        .from(job_application)
        .innerJoin(job, eq(job.id, job_application.jobId))
        .where(eq(job.userId, ctx.userId))
        .execute(),

      // Pending applications (status = "applied")
      db
        .select({ count: count() })
        .from(job_application)
        .innerJoin(job, eq(job.id, job_application.jobId))
        .where(
          and(eq(job.userId, ctx.userId), eq(job_application.status, "applied"))
        )
        .execute(),
    ]);

    return {
      jobs: jobsWithCounts,
      summary: {
        totalJobs: totalJobsCount[0]?.count || 0,
        activeJobs: activeJobsCount[0]?.count || 0,
        expiredJobs: expiredJobsCount[0]?.count || 0,
        totalApplicants: totalApplicantsCount[0]?.count || 0,
        pendingReview: pendingReviewCount[0]?.count || 0,
      },
    };
  }),
});
