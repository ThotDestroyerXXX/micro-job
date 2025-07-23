import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { z } from "zod";
import db from "@/db";
import { dayEnum, user, user_availability } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const profileRouter = createTRPCRouter({
  changeAccepting: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        isAcceptingJobs: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, isAcceptingJobs } = input;

      await db
        .update(user)
        .set({ isAcceptingJobs })
        .where(eq(user.id, userId))
        .execute();
    }),

  updateUserAvailability: baseProcedure
    .input(
      z.object({
        userId: z.string(),
        dayOfWeek: z.enum(dayEnum.enumValues),
        isBusy: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, dayOfWeek, isBusy } = input;
      const existingAvailability = await db
        .select()
        .from(user_availability)
        .where(
          and(
            eq(user_availability.userId, userId),
            eq(user_availability.day_of_week, dayOfWeek)
          )
        )
        .execute();

      if (existingAvailability.length > 0) {
        // Update existing availability
        await db
          .update(user_availability)
          .set({ isBusy })
          .where(
            and(
              eq(user_availability.userId, userId),
              eq(user_availability.day_of_week, dayOfWeek)
            )
          )
          .execute();
      } else {
        // Create new availability
        await db
          .insert(user_availability)
          .values({
            id: uuidv4(),
            userId,
            day_of_week: dayOfWeek,
            isBusy: isBusy,
          })
          .execute();
      }
    }),

  getUserAvailability: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      const availability = await db
        .select()
        .from(user_availability)
        .where(eq(user_availability.userId, userId))
        .execute();
      return availability;
    }),

  updateUserProfile: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        username: z.string(),
        bio: z.string().optional(),
        location: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, name, bio, location, username } = input;

      await db
        .update(user)
        .set({ name, bio, location, username })
        .where(eq(user.id, userId))
        .execute();
    }),
});
