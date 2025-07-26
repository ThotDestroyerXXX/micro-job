import CreateJobView from "@/modules/job/ui/views/create-job-view";
import { HydrateClient } from "@/trpc/server";

export default function Page() {
  return (
    <HydrateClient>
      <CreateJobView />
    </HydrateClient>
  );
}
