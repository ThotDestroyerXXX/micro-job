import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import db from "@/db";
import { job, job_application, user } from "@/db/schema";
import { and, asc, count, desc, eq, ne, or } from "drizzle-orm";

async function getCardSection(userId: string) {
  const [active, upcoming] = await Promise.all([
    db
      .select({
        active_applications: count(job_application),
      })
      .from(job_application)
      .where(
        and(
          eq(job_application.userId, userId),
          eq(job_application.status, "in progress")
        )
      ),

    db
      .select({
        upcoming_jobs: count(job_application),
      })
      .from(job_application)
      .where(
        and(
          eq(job_application.userId, userId),
          or(
            eq(job_application.status, "applied"),
            eq(job_application.status, "accepted")
          )
        )
      ),
  ]);

  return {
    activeApplications: active,
    upcomingJobs: upcoming,
  };
}

export const dashboardRouter = createTRPCRouter({
  getDashboardData: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    if (!userId) {
      throw new Error("User is not authenticated.");
    }

    const [recentActivity, recommendedJobs, upcomingJobs, cardStats] =
      await Promise.all([
        db
          .select({
            job_application: job_application,
            job: job,
            employer: user.name,
          })
          .from(job_application)
          .where(eq(job_application.userId, userId))
          .orderBy(desc(job_application.applied_at))
          .limit(10)
          .innerJoin(job, eq(job.id, job_application.jobId))
          .innerJoin(user, eq(user.id, job.userId)),

        // Get recommended jobs based on skill matching
        (async () => {
          // First get the current user's skills
          const userResult = await db
            .select({
              skills: user.skills,
            })
            .from(user)
            .where(eq(user.id, userId));

          const userSkills =
            userResult[0]?.skills?.map((skill) => skill.name) || [];

          // Get all active jobs with their details
          const allJobs = await db
            .select({
              job: job,
              employer: user.name,
            })
            .from(job)
            .innerJoin(user, eq(user.id, job.userId))
            .where(
              and(
                eq(job.is_active, true),
                eq(job.is_visible, true),
                ne(job.userId, userId) // Don't recommend user's own jobs
              )
            );

          // Calculate match scores in JavaScript
          const jobsWithScores = allJobs.map((jobData) => {
            const requiredSkills = jobData.job.required_skills || [];
            const matchingSkills = requiredSkills.filter((skill) =>
              userSkills.includes(skill)
            );

            return {
              ...jobData,
              match_score: matchingSkills.length,
              matching_skills: matchingSkills,
            };
          });

          // Sort by match score (highest first), then by creation date
          jobsWithScores.sort((a, b) => {
            if (b.match_score !== a.match_score) {
              return b.match_score - a.match_score;
            }
            // Handle potential null dates
            const dateA = a.job.createdAt
              ? new Date(a.job.createdAt).getTime()
              : 0;
            const dateB = b.job.createdAt
              ? new Date(b.job.createdAt).getTime()
              : 0;
            return dateB - dateA;
          });

          return jobsWithScores.slice(0, 3);
        })(),

        db
          .select({
            job_application: job_application,
            job: job,
            employer: user.name,
          })
          .from(job_application)
          .where(
            and(
              eq(job_application.userId, userId),
              or(
                eq(job_application.status, "applied"),
                eq(job_application.status, "accepted")
              )
            )
          )
          .orderBy(asc(job_application.applied_at))
          .innerJoin(job, eq(job.id, job_application.jobId))
          .innerJoin(user, eq(user.id, job.userId)),

        getCardSection(userId), // helper function, see below
      ]);

    return {
      recentActivity,
      recommendedJobs,
      upcomingJobs,
      cardStats,
    };
  }),
});
