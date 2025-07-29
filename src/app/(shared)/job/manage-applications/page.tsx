import { auth } from "@/lib/auth";
import ManageApplicationView from "@/modules/job/ui/views/manage-application-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    return redirect("/");
  }

  void trpc.job.getOwnJobs.prefetch();

  return (
    <HydrateClient>
      <ManageApplicationView />
    </HydrateClient>
  );
}
