"use client";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import ApplicantCard from "../../../components/manage-applications/detail/applicant-card";
import { trpc } from "@/trpc/client";

export default function ApplicantList({ id }: Readonly<{ id: string }>) {
  const [data] = trpc.job.getOwnJob.useSuspenseQuery({ jobId: id });
  return (
    <div className='space-y-4 grid grid-cols-1 md:grid-cols-2'>
      {data.applications.length === 0 ? (
        <Card className='border-0 shadow-lg bg-white p-12 text-center'>
          <Users className='h-16 w-16 mx-auto mb-4 text-gray-400' />
          <h3 className='text-xl font-semibold text-gray-600 mb-2'>
            No applicants found
          </h3>
          <p className='text-gray-500'>No one has applied to this job yet</p>
        </Card>
      ) : (
        data.applications.map((applicant) => (
          <ApplicantCard
            key={applicant.application.id}
            applicant={applicant.user}
            jobApplication={applicant.application}
            start_date={data.job.start_date}
            end_date={data.job.end_date}
          />
        ))
      )}
    </div>
  );
}
