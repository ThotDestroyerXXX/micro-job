"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calendar, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/components/not-found";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { trpc } from "@/trpc/client";
import { formatDateShort } from "@/lib/utils";

function UpcomingJobSkeleton() {
  return (
    <div className='space-y-3'>
      {Array.from({ length: 3 }).map((tes, index) => (
        <div
          key={`${tes}-${index}`}
          className='w-full h-20 bg-gray-200 rounded-lg animate-pulse'
        />
      ))}
    </div>
  );
}

export default function UpcomingJob() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Calendar className='h-5 w-5 text-blue-600' />
          Upcoming Jobs
        </CardTitle>
        <CardDescription>Your confirmed and pending jobs</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<UpcomingJobSkeleton />}>
          <ErrorBoundary
            fallback={<NotFound message='Internal Server Error' />}
          >
            <UpcomingJobSuspense />
          </ErrorBoundary>
        </Suspense>
      </CardContent>
    </Card>
  );
}

function UpcomingJobSuspense() {
  const [{ upcomingJobs }] = trpc.dashboard.getDashboardData.useSuspenseQuery();

  return (
    <>
      {upcomingJobs.length > 0 ? (
        <div className='space-y-3'>
          {upcomingJobs.map((job) => (
            <div
              key={job.job_application.id}
              className='flex items-center justify-between p-4 bg-gray-50 rounded-lg sm:flex-row flex-col'
            >
              <div className='flex items-center space-x-4'>
                <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                  <Briefcase className='h-5 w-5 text-blue-600' />
                </div>
                <div>
                  <h4 className='font-medium text-gray-900'>{job.job.title}</h4>
                  <p className='text-sm text-gray-600'>with {job.employer}</p>
                </div>
              </div>
              <div className='text-right sm:flex-col flex-row flex items-center gap-2 sm:gap-0'>
                <p className='font-medium text-gray-900'>
                  {formatDateShort(job.job.start_date ?? "")}
                  {", "}
                  {job.job.schedule?.[0].startTime.toString() ?? "TBA"}
                </p>
                <p className='text-sm text-green-600'>$ {job.job.pay_amount}</p>
              </div>
              <Badge
                variant={
                  job.job_application.status === "accepted"
                    ? "default"
                    : "secondary"
                }
                className='rounded-full'
              >
                {job.job_application.status}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <div className='p-4 text-center text-gray-500'>
          No upcoming jobs found.
        </div>
      )}
    </>
  );
}
