import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InferSelectModel } from "drizzle-orm";
import { job } from "@/db/schema";
import { formatDateShort } from "@/lib/utils";
import { getJobStatus } from "@/modules/job/utils/job-status";

export default function JobSummaryCard({
  jobs,
  applicationCount,
}: Readonly<{
  jobs: InferSelectModel<typeof job>;
  applicationCount: {
    accepted: number;
    pending: number;
    total: number;
    rejected: number;
  };
}>) {
  const statusInfo = getJobStatus(
    jobs.expires_at,
    jobs.end_date,
    applicationCount.accepted
  );
  return (
    <Card className='border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-8'>
      <CardContent>
        <div className='flex items-start justify-between mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2 break-all'>
              {jobs.title}
            </h1>
            <div className='flex items-center gap-4 text-sm text-gray-600'>
              <Badge
                variant='outline'
                className='bg-blue-50 text-blue-700 border-blue-200'
              >
                {jobs.category}
              </Badge>
              <div className='flex items-center gap-1'>
                <MapPin className='h-4 w-4' />
                <span>{jobs.location_type}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                <span>Posted {formatDateShort(jobs.createdAt ?? "")}</span>
              </div>
            </div>
          </div>
          <Badge className={`${statusInfo.color} border-0 text-sm`}>
            {statusInfo.status}
          </Badge>
        </div>

        {/* Application Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div className='text-center p-4 bg-blue-50 rounded-lg'>
            <Users className='h-6 w-6 text-blue-600 mx-auto mb-2' />
            <div className='text-2xl font-bold text-blue-900'>
              {applicationCount.total}
            </div>
            <div className='text-sm text-blue-700'>Total Applications</div>
          </div>
          <div className='text-center p-4 bg-yellow-50 rounded-lg'>
            <Clock className='h-6 w-6 text-yellow-600 mx-auto mb-2' />
            <div className='text-2xl font-bold text-yellow-900'>
              {applicationCount.pending}
            </div>
            <div className='text-sm text-yellow-700'>Pending Review</div>
          </div>
          <div className='text-center p-4 bg-green-50 rounded-lg'>
            <CheckCircle className='h-6 w-6 text-green-600 mx-auto mb-2' />
            <div className='text-2xl font-bold text-green-900'>
              {applicationCount.accepted}
            </div>
            <div className='text-sm text-green-700'>Accepted</div>
          </div>
          <div className='text-center p-4 bg-red-50 rounded-lg'>
            <XCircle className='h-6 w-6 text-red-600 mx-auto mb-2' />
            <div className='text-2xl font-bold text-red-900'>
              {applicationCount.rejected}
            </div>
            <div className='text-sm text-red-700'>Rejected</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
