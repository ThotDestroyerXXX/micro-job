"use client";
import { trpc } from "@/trpc/client";
import ApplyCard from "../../components/detail/apply-card";
import EmployerCard from "../../components/detail/employer-card";
import SafetyTips from "../../components/detail/safety-tips";

export default function JobDetailSidebar({ id }: Readonly<{ id: string }>) {
  const [data] = trpc.job.getOne.useSuspenseQuery({ jobId: id });
  return (
    <div className='space-y-6'>
      <ApplyCard
        budgetAmount={data.job.pay_amount}
        paymentTypes={data.job.pay_type}
        applicants={data.applicationCount}
        workersNeeded={data.job.workers_needed}
      />
      <EmployerCard
        users={data.user}
        jobsCompleted={data.user.totalCompletedJobs}
        jobsPosted={data.user.totalPostedJobs}
      />
      <SafetyTips />
    </div>
  );
}
