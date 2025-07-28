import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { job } from "@/db/schema";
import { formatDateShort } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { Home, MapPin, Calendar, Clock } from "lucide-react";

export default function LocationDetail({
  jobs,
}: Readonly<{ jobs: InferSelectModel<typeof job> }>) {
  return (
    <TabsContent value='location-time' className='space-y-6'>
      {/* Location Details */}
      <div>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>
          Location Details
        </h3>
        <div className='space-y-4'>
          <div className='flex items-start flex-col gap-3 p-4 bg-blue-50 rounded-lg'>
            <div className='flex items-center gap-3'>
              <Home className='h-6 w-6 text-blue-600 mt-1 shrink-0' />
              <div>
                <div className='font-medium text-blue-900'>Location Type</div>
                <div className='text-blue-700'>{jobs.location_type}</div>
              </div>
            </div>
            {jobs.location_type === "on-site" && (
              <div className='text-sm text-blue-600 mt-2 break-all flex flex-row gap-2'>
                <MapPin className='h-6 w-6 inline shrink-0' />
                <p>{jobs.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Time & Schedule */}
      <div>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>
          Schedule Details
        </h3>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex items-center gap-3 p-4 bg-green-50 rounded-lg'>
              <Calendar className='h-6 w-6 text-green-600' />
              <div>
                <div className='font-medium text-green-900'>Start Date</div>
                <div className='text-green-700'>
                  {formatDateShort(jobs.start_date ?? "")}
                </div>
              </div>
            </div>
            {jobs.end_date && (
              <div className='flex items-center gap-3 p-4 bg-red-50 rounded-lg'>
                <Calendar className='h-6 w-6 text-red-600' />
                <div>
                  <div className='font-medium text-red-900'>End Date</div>
                  <div className='text-red-700'>
                    {formatDateShort(jobs.end_date ?? "")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Weekly Schedule for Recurring Jobs */}
          {jobs.job_type === "Recurring" && (
            <div>
              <h4 className='font-semibold text-gray-900 mb-3'>
                Weekly Schedule
              </h4>
              <div className='space-y-2'>
                {jobs.schedule?.map((dayInfo, index) => (
                  <div
                    key={`${dayInfo.day}-${index}`}
                    className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                  >
                    <div className='flex items-center gap-3'>
                      <Clock className='h-4 w-4 text-blue-600' />
                      <span className='font-medium'>{dayInfo.day}</span>
                    </div>
                    <span className='text-sm text-gray-600'>
                      {dayInfo.startTime.toString()} -{" "}
                      {dayInfo.endTime.toString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Time for Non-Recurring Jobs */}
          {jobs.job_type !== "Recurring" &&
            jobs.schedule?.[0].startTime &&
            jobs.schedule?.[0].endTime && (
              <div className='flex items-center gap-3 p-4 bg-purple-50 rounded-lg'>
                <Clock className='h-6 w-6 text-purple-600' />
                <div>
                  <div className='font-medium text-purple-900'>
                    Working Hours
                  </div>
                  <div className='text-purple-700'>
                    {jobs.schedule[0].startTime.toString()} -{" "}
                    {jobs.schedule[0].endTime.toString()}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </TabsContent>
  );
}
