import { job } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { DollarSign, MapPin, Clock, Users } from "lucide-react";

export default function KeyDetailGrid({
  jobs,
  applicationCount,
}: Readonly<{ jobs: InferSelectModel<typeof job>; applicationCount: number }>) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-6'>
      <div className='text-center p-4 bg-green-50 rounded-lg'>
        <DollarSign className='h-6 w-6 text-green-600 mx-auto mb-2' />
        <div className=' font-bold text-green-900'>$ {jobs.pay_amount}</div>
        <div className='text-sm text-green-700'>
          {jobs.pay_type?.toLowerCase()}
        </div>
      </div>
      <div className='text-center p-4 bg-blue-50 rounded-lg'>
        <MapPin className='h-6 w-6 text-blue-600 mx-auto mb-2' />
        <div className='text-sm font-semibold text-blue-900'>
          {jobs.location_type}
        </div>
        <div className='text-xs text-blue-700'>Location Type</div>
      </div>
      <div className='text-center p-4 bg-purple-50 rounded-lg'>
        <Clock className='h-6 w-6 text-purple-600 mx-auto mb-2' />
        <div className='text-sm font-semibold text-purple-900'>
          {jobs.job_type}
        </div>
        <div className='text-xs text-purple-700'>Job Type</div>
      </div>
      <div className='text-center p-4 bg-orange-50 rounded-lg'>
        <Users className='h-6 w-6 text-orange-600 mx-auto mb-2' />
        <div className='text-sm font-semibold text-orange-900'>
          {applicationCount}
        </div>
        <div className='text-xs text-orange-700'>Applicants</div>
      </div>
    </div>
  );
}
