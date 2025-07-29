import { Card, CardContent } from "@/components/ui/card";
import { InferSelectModel } from "drizzle-orm";
import { job } from "@/db/schema";
import { getJobStatus } from "../../../utils/job-status";
import { getCategoryGradient } from "@/lib/job-category-gradients";
import JobHeader from "./job-header";
import JobStatsGrid from "./job-stats-grid";
import JobSkills from "./job-skills";
import JobActionButtons from "./job-action-buttons";
import ExpirationWarning from "./expiration-warning";

interface ManageJobCardProps {
  jobs: InferSelectModel<typeof job> & {
    acceptedCount: number;
    pendingCount: number;
    applicationCount: number;
  };
  onAction?: (jobId: string, action: string) => void;
}

export default function ManageJobCard({
  jobs,
  onAction,
}: Readonly<ManageJobCardProps>) {
  const statusInfo = getJobStatus(
    jobs.expires_at,
    jobs.end_date,
    jobs.acceptedCount
  );

  const handleJobAction = (jobId: string, action: string) => {
    onAction?.(jobId, action);
    // TODO: Implement specific job actions
    console.log(`${action} job:`, jobId);
  };

  return (
    <Card className='group hover:shadow-xl h-full transition-all duration-500 border-0 bg-white overflow-hidden p-0'>
      {/* Header with gradient */}
      <div
        className={`h-2 bg-gradient-to-r ${getCategoryGradient(jobs.category ?? "Other").gradient}`}
      />

      <CardContent className='pb-6 flex flex-col h-full'>
        <div className='flex-1'>
          <JobHeader
            title={jobs.title}
            shortDescription={jobs.short_description}
            locationType={jobs.location_type}
            address={jobs.address}
            createdAt={jobs.createdAt}
            statusInfo={statusInfo}
            jobId={jobs.id}
            onAction={handleJobAction}
          />

          <JobStatsGrid jobs={jobs} />

          <JobSkills skills={jobs.required_skills} />
        </div>

        <div className='mt-auto'>
          <JobActionButtons
            status={statusInfo.status}
            pendingCount={jobs.pendingCount}
            jobId={jobs.id}
            onAction={handleJobAction}
          />

          <ExpirationWarning
            expiresAt={jobs.expires_at}
            isActive={statusInfo.status === "active"}
          />
        </div>
      </CardContent>
    </Card>
  );
}
