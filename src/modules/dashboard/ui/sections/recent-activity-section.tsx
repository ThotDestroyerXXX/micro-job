"use client";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "@/components/not-found";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoryGradient } from "@/lib/job-category-gradients";
import { getTimeAgo } from "@/lib/utils";

const recentActivityBadgeVariant = (status: string) => {
  switch (status) {
    case "applied":
      return "default";
    case "saved":
      return "secondary";
    default:
      return "outline";
  }
};

function RecentActivitySkeleton() {
  return (
    <div className='space-y-3'>
      {Array.from({ length: 3 }).map((tes, index) => (
        <Skeleton key={`${tes}-${index}`} className='w-full h-20' />
      ))}
    </div>
  );
}

export default function RecentActivity() {
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-gray-900'>Recent Activity</h2>
        <Button
          variant='link'
          size='sm'
          className='text-blue-600 hover:text-blue-700'
        >
          View All
        </Button>
      </div>
      <Suspense fallback={<RecentActivitySkeleton />}>
        <ErrorBoundary fallback={<NotFound message='Internal Server Error' />}>
          <RecentActivitySuspense />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

function RecentActivitySuspense() {
  const [{ recentActivity }] =
    trpc.dashboard.getDashboardData.useSuspenseQuery();

  return (
    <div className='space-y-3'>
      {recentActivity.length > 0 ? (
        recentActivity.map((jobApplication) => (
          <Card
            key={jobApplication.job_application.id}
            className='hover:shadow-md transition-shadow border-0 bg-white p-0 pb-6'
          >
            <div
              className={`h-1 bg-gradient-to-r rounded-t-lg ${getCategoryGradient(jobApplication.job.category ?? "Other").gradient}`}
            />
            <CardContent>
              <div className='flex items-center justify-between'>
                <div className='flex-1'>
                  <h3 className='font-medium text-gray-900'>
                    {jobApplication.job.title}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    by {jobApplication.employer}
                  </p>
                  <div className='flex items-center gap-4 mt-2 text-xs text-gray-500'>
                    <span className='flex items-center gap-1'>
                      <DollarSign className='h-3 w-3' />
                      {jobApplication.job.pay_amount}
                    </span>
                    <span className='flex items-center gap-1'>
                      <MapPin className='h-3 w-3' />
                      {jobApplication.job.address}
                    </span>
                  </div>
                </div>
                <div className='items-center text-center'>
                  <Badge
                    variant={recentActivityBadgeVariant(
                      jobApplication.job_application.status ?? "Not Found"
                    )}
                    className='mb-2 rounded-full'
                  >
                    {jobApplication.job_application.status === "applied" &&
                      "Applied"}
                    {jobApplication.job_application.status === "in progress" &&
                      "Interview"}
                  </Badge>
                  <p className='text-xs text-gray-500'>
                    {jobApplication.job_application.status === "applied" &&
                      getTimeAgo(
                        jobApplication.job_application.applied_at ?? ""
                      )}
                    {jobApplication.job_application.status === "in progress" &&
                      getTimeAgo(
                        jobApplication.job_application.accepted_at ?? ""
                      )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className='p-4 text-center text-gray-500'>
          No recent activity found.
        </div>
      )}
    </div>
  );
}
