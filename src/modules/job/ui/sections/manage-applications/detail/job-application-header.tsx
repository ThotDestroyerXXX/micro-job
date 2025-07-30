"use client";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobSummaryCard from "../../../components/manage-applications/detail/job-summary-card";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

export default function JobApplicationHeader({ id }: Readonly<{ id: string }>) {
  const [data] = trpc.job.getOwnJob.useSuspenseQuery({ jobId: id });
  const router = useRouter();
  return (
    <>
      <div className='flex items-center gap-4 mb-8'>
        <Button
          variant='ghost'
          size='sm'
          className='p-2 hover:bg-white/80'
          onClick={() => router.back()}
        >
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <span>My Jobs</span>
          <ChevronRight className='h-4 w-4' />
          <span className='text-gray-900 font-medium'>Job Applicants</span>
        </div>
      </div>
      <JobSummaryCard
        jobs={data.job}
        applicationCount={data.applicationCounts}
      />
    </>
  );
}
