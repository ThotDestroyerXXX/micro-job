"use client";

import NotFound from "@/components/not-found";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Zap, DollarSign, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { trpc } from "@/trpc/client";
import { addressDisplay, formatDateShort } from "@/lib/utils";

function RecommendedJobSkeleton() {
  return (
    <div className='space-y-3'>
      {Array.from({ length: 3 }).map((test, index) => (
        <Skeleton
          key={`${test}-${index}`}
          className='w-full h-20 bg-gray-200 rounded-lg animate-pulse'
        />
      ))}
    </div>
  );
}

export default function RecommendedJob() {
  return (
    <section>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-gray-900'>
          Recommended for You
        </h2>
        <Button
          variant='ghost'
          size='sm'
          className='text-blue-600 hover:text-blue-700'
        >
          View All
        </Button>
      </div>
      <Suspense fallback={<RecommendedJobSkeleton />}>
        <ErrorBoundary fallback={<NotFound message='Internal Server Error' />}>
          <RecommendedJobSuspense />
        </ErrorBoundary>
      </Suspense>
    </section>
  );
}

function RecommendedJobSuspense() {
  const [{ recommendedJobs }] =
    trpc.dashboard.getDashboardData.useSuspenseQuery();

  return (
    <div className='space-y-3'>
      {recommendedJobs.length > 0 ? (
        recommendedJobs.map((job) => (
          <Card
            key={job.job.id}
            className='hover:shadow-md transition-shadow border-0 bg-white px-2 py-6 '
          >
            <CardContent>
              <div className='flex items-start justify-between mb-3 gap-4'>
                <div className='flex-1'>
                  <h3 className='font-medium text-gray-900 break-all'>
                    {job.job.title}
                  </h3>
                  <p className='text-sm text-gray-600'>{job.employer}</p>
                </div>
                <div className='flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>
                  <Zap className='h-3 w-3' />
                  {job.match_score}% match
                </div>
              </div>
              <div className='flex items-center gap-4 mb-3 text-sm'>
                <span className='flex items-center gap-1 text-green-600 font-medium'>
                  <DollarSign className='h-4 w-4' />
                  {job.job.pay_amount}
                </span>
                <span className='flex items-center gap-1 text-gray-500 break-all'>
                  <MapPin className='h-4 w-4 shrink-0' />
                  {addressDisplay(
                    job.job.location_type ?? "",
                    job.job.address ?? "N/A"
                  )}
                </span>
                <span className='flex items-center gap-1 text-gray-500 shrink-0'>
                  <Clock className='h-4 w-4' />
                  {formatDateShort(job.job.updatedAt ?? "N/A")}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex gap-1'>
                  {job.job.required_skills?.map((skill) => (
                    <Badge key={skill} variant='outline' className='text-xs'>
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button size='default' className='ml-4'>
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className='p-4 text-center text-gray-500'>
          No recommended jobs found.
        </div>
      )}
    </div>
  );
}
