import { jobRouter } from "@/modules/job/server/procedure";
import { createTRPCRouter } from "../init";
import { profileRouter } from "@/modules/profile/server/procedure";
import { dashboardRouter } from "@/modules/dashboard/server/procedure";

export const appRouter = createTRPCRouter({
  profile: profileRouter,
  job: jobRouter,
  dashboard: dashboardRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
