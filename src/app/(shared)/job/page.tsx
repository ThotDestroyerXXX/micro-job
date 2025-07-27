import JobView from "@/modules/job/ui/views/job-view";
import { HydrateClient, trpc } from "@/trpc/server";

export default function Page() {
  void trpc.job.getAll.prefetch();
  return (
    <HydrateClient>
      <JobView />
    </HydrateClient>
  );
}
