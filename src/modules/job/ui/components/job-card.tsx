"use client";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Clock, MapPin, Shield, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InferSelectModel } from "drizzle-orm";
import { job as jobTable, user } from "@/db/schema"; // Adjust the import path as needed

import { getCategoryGradient } from "@/lib/job-category-gradients";
import { addressDisplay, getRelativeTime, getTimeAgo } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import HeartSave from "@/components/heart-save";

const JobCard = ({
  job,
  userJob,
  viewMode,
  isSaved,
}: {
  job: InferSelectModel<typeof jobTable>;
  userJob: InferSelectModel<typeof user>;
  viewMode: "list" | "grid";
  isSaved: boolean;
}) => {
  return (
    <Card
      className={`group hover:shadow-xl h-full transition-all duration-500 cursor-pointer border-0 overflow-hidden ${
        viewMode === "list" ? "flex-row gap-1" : "flex-col"
      } p-0`}
    >
      {/* Gradient Header */}
      <div
        className={`bg-gradient-to-r ${getCategoryGradient(job.category ?? "Other").gradient} ${
          viewMode === "list" ? "w-2" : "h-3"
        }`}
      />

      <CardContent
        className={`h-full ${viewMode === "list" ? "flex-1 w-20 p-6" : " pb-6"}`}
      >
        <div
          className={`flex-col
            ${
              viewMode === "list"
                ? "flex items-start gap-6 min-w-0"
                : "flex flex-col h-full"
            }
          `}
        >
          {/* Main Content */}
          <div className={viewMode === "list" ? "flex-1 min-w-0 w-full" : ""}>
            {/* Header Section */}
            <div className='flex items-start justify-between mb-4 gap-4'>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 mb-2'>
                  <h3 className='font-bold text-xl group-hover:text-blue-600 transition-colors leading-tight line-clamp-1 break-words'>
                    {job.title}
                  </h3>
                </div>
                <p className='text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed break-words'>
                  {job.short_description}
                </p>

                {/* Key Metrics Row */}
                <div className='flex items-center gap-4 mb-3 flex-wrap'>
                  <div className='flex items-center gap-1 text-green-600 font-bold text-lg'>
                    <DollarSign className='h-5 w-5 shrink-0' />
                    <span className='whitespace-nowrap'>{job.pay_amount}</span>
                    <span className='text-sm text-gray-500 font-normal whitespace-nowrap'>
                      {job.pay_type === "Hourly" && `/ Hour`}
                    </span>
                  </div>
                  <div className='flex items-center gap-1 text-gray-500 text-sm'>
                    <Clock className='h-4 w-4 shrink-0' />
                    <span className='whitespace-nowrap'>
                      {getRelativeTime(
                        job.start_date ?? "",
                        job.end_date ?? ""
                      )}{" "}
                      days
                    </span>
                  </div>
                </div>
              </div>

              <HeartSave jobId={job.id} isSaved={isSaved} isDetail={true} />
            </div>

            {/* Location & Time */}
            <div className='flex items-center gap-4 mb-4 text-sm'>
              <div className='flex items-center gap-1 text-gray-600 flex-1 min-w-0'>
                <MapPin className='h-4 w-4 shrink-0' />
                <span className='truncate'>
                  {addressDisplay(job.location_type ?? "", job.address ?? "")}
                </span>
              </div>
              <div className='flex items-center gap-1 text-gray-500 shrink-0'>
                <Clock className='h-4 w-4 shrink-0' />
                <span className='whitespace-nowrap'>
                  {getTimeAgo(job.createdAt ?? "")}
                </span>
              </div>
            </div>

            {/* Employer Section */}
            <div
              className={`flex items-center justify-between ${viewMode === "list" ? "mb-0" : "mb-4"} p-3 bg-gray-50 rounded-lg gap-3`}
            >
              <div className='flex items-center gap-3 min-w-0 flex-1'>
                <UserAvatar image={userJob.image} alt={userJob.name} />
                <div className='min-w-0 flex-1'>
                  <div className='flex items-center gap-2'>
                    <p className='font-semibold text-gray-900 truncate'>
                      {userJob.name}
                    </p>
                    {userJob.emailVerified && userJob.phoneNumberVerified && (
                      <Shield className='h-4 w-4 text-blue-500 shrink-0' />
                    )}
                  </div>
                  <div className='flex items-center gap-3 text-xs text-gray-600'>
                    <div className='flex items-center gap-1'>
                      <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                      <span className='font-medium'>{userJob.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Badge variant='outline' className='text-xs font-medium shrink-0'>
                {job.job_type}
              </Badge>
            </div>
          </div>

          {/* Skills & Action - Side panel for list view */}
          <div className={`flex gap-2 flex-nowrap overflow-hidden w-full`}>
            {job.required_skills?.map((skill) => (
              <Badge
                key={skill}
                variant='secondary'
                className='text-xs bg-blue-50 text-blue-700 hover:bg-blue-100'
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
