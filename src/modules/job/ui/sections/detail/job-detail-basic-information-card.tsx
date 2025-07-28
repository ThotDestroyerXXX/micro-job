"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/trpc/client";
import KeyDetailGrid from "../../components/detail/key-detail-grid";
import QuickStats from "../../components/detail/quick-stats";
import HeartSave from "@/components/heart-save";

export default function JobDetailBasicInformationCard({
  id,
}: Readonly<{ id: string }>) {
  const [data] = trpc.job.getOne.useSuspenseQuery({ jobId: id });
  return (
    <Card className='border-0 shadow-lg bg-white/90 backdrop-blur-sm'>
      <CardContent>
        <div className='flex items-start justify-between mb-6'>
          <div className='flex-1 w-full'>
            <div className='flex items-center gap-3 mb-3 justify-between flex-wrap'>
              <div className='flex items-center gap-2 flex-wrap'>
                <Badge
                  variant='outline'
                  className='bg-blue-50 text-blue-700 border-blue-200'
                >
                  {data.job.job_type}
                </Badge>
                <Badge
                  variant='outline'
                  className='bg-purple-50 text-purple-700 border-purple-200'
                >
                  {data.job.category}
                </Badge>
              </div>
              <div className='flex items-center gap-2'>
                <HeartSave jobId={data.job.id} isSaved={data.isSaved} />
                <Button
                  variant='outline'
                  size='sm'
                  className='p-3 hover:bg-gray-50 bg-transparent'
                >
                  <Flag className='h-4 w-4 text-gray-500' />
                </Button>
              </div>
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-3 leading-tight break-all'>
              {data.job.title}
            </h1>
            <p className='text-lg text-gray-600 leading-relaxed mb-4 break-all'>
              {data.job.short_description}
            </p>

            {/* Workers Needed */}
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <Users className='h-4 w-4' />
              <span>
                {data.job.workers_needed ?? "N/A"} worker
                {data.job.workers_needed && data.job.workers_needed > 1
                  ? "s"
                  : ""}{" "}
                needed
              </span>
            </div>
          </div>
        </div>

        {/* Key Details Grid - Payment & Budget Info */}
        <KeyDetailGrid
          jobs={data.job}
          applicationCount={data.applicationCount}
        />

        {/* Quick Stats */}
        <QuickStats
          createdAt={data.job.createdAt}
          expiresAt={data.job.expires_at}
          isVisible={data.job.is_visible}
        />
      </CardContent>
    </Card>
  );
}
