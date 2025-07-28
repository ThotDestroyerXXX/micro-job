import JobDetailView from "@/modules/job/ui/views/job-detail-view";
import { HydrateClient, trpc } from "@/trpc/server";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;

  void trpc.job.getOne.prefetch({ jobId: id });
  return (
    <HydrateClient>
      <JobDetailView id={id} />
    </HydrateClient>
  );
}
