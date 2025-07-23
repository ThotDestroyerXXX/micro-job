import { createTRPCRouter } from "../init";
import { profileRouter } from "@/modules/profile/server/procedure";

export const appRouter = createTRPCRouter({
  profile: profileRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
