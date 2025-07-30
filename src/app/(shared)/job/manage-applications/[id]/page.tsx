import { auth } from "@/lib/auth";
import JobApplicationView from "@/modules/job/ui/views/job-application-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    return redirect("/");
  }

  void trpc.job.getOwnJob.prefetch({ jobId: id });

  return (
    <HydrateClient>
      <JobApplicationView id={id} />
    </HydrateClient>
  );
}
