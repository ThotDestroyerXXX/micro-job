import { auth } from "@/lib/auth";
import JobDetailView from "@/modules/job/ui/views/job-detail-view";
import { HydrateClient, trpc } from "@/trpc/server";
import { headers } from "next/headers";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  void trpc.job.getOne.prefetch({ jobId: id });
  return (
    <HydrateClient>
      <JobDetailView id={id} userId={session?.user.id} />
    </HydrateClient>
  );
}
