import { auth } from "@/lib/auth";
import DashboardView from "@/modules/dashboard/ui/views/dashboard-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionData) {
    return redirect("/login");
  }

  void trpc.dashboard.getDashboardData.prefetch();

  return (
    <HydrateClient>
      <DashboardView user={sessionData.user} />
    </HydrateClient>
  );
}
