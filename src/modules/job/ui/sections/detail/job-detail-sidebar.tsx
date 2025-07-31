"use client";
import { trpc } from "@/trpc/client";
import ApplyCard from "../../components/detail/apply-card";
import EmployerCard from "../../components/detail/employer-card";
import SafetyTips from "../../components/detail/safety-tips";

export default function JobDetailSidebar({
  id,
  userId,
}: Readonly<{ id: string; userId: string | undefined }>) {
  const [data] = trpc.job.getOne.useSuspenseQuery({ jobId: id });
  return (
    <div className='space-y-6'>
      {userId !== data.user.id && (
        <ApplyCard
          jobs={data.job}
          applicants={data.applicationCount}
          isApplied={data.isApplied}
        />
      )}
      <EmployerCard
        users={data.user}
        jobsCompleted={data.user.totalCompletedJobs}
        jobsPosted={data.user.totalPostedJobs}
      />
      <SafetyTips />
    </div>
  );
}
