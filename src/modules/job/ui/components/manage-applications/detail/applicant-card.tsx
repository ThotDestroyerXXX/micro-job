import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  MapPin,
  GraduationCap,
  Calendar,
  Check,
  X,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InferSelectModel } from "drizzle-orm";
import { job_application, user, user_availability } from "@/db/schema";
import UserAvatar from "@/components/user-avatar";
import { getApplicationStatusColor } from "@/modules/job/utils/job-status";
import { formatDateShort, getExperienceLevel } from "@/lib/utils";
import ApplicantDetailModal from "./applicant-detail-modal";
import { useHandleApplicationStatusChange } from "@/modules/job/hooks/use-job-hook";

export default function ApplicantCard({
  applicant,
  jobApplication,
  start_date,
  end_date,
}: Readonly<{
  applicant: InferSelectModel<typeof user> & {
    availability: InferSelectModel<typeof user_availability>[];
  };
  jobApplication: InferSelectModel<typeof job_application>;
  start_date: string | Date | null;
  end_date: string | Date | null;
}>) {
  const { handleStatusChange } = useHandleApplicationStatusChange();
  return (
    <Card className='hover:shadow-lg transition-all duration-300 border-0 bg-white w-full'>
      <CardContent>
        <div className='flex flex-col gap-4'>
          {/* Main Content */}
          <div className='min-w-0 w-full'>
            <div className='flex items-start gap-4'>
              {/* Avatar */}
              <UserAvatar image={applicant.image} alt={applicant.name} />
              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-3 mb-1'>
                  <h3 className='text-xl font-semibold text-gray-900 truncate'>
                    {applicant.name}
                  </h3>
                  <Badge
                    className={`${getApplicationStatusColor(jobApplication.status ?? "", start_date ?? "", end_date ?? "").color} border-0 shrink-0`}
                  >
                    {getApplicationStatusColor(
                      jobApplication.status ?? "",
                      start_date ?? "",
                      end_date ?? ""
                    ).status ?? "Unknown"}
                  </Badge>
                </div>
                <div className='flex items-center gap-4 text-sm text-gray-600 mb-2 min-w-0'>
                  <div className='flex items-center gap-1 shrink-0'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='font-medium'>
                      {applicant.rating ?? "N/A"}
                    </span>
                    {/* <span>({applicant.totalReviews} reviews)</span> */}
                  </div>
                  <div className='flex items-center gap-1 min-w-0'>
                    <MapPin className='h-4 w-4 shrink-0' />
                    <span className='truncate'>
                      {applicant.location ?? "Not Specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <p className='text-gray-700 mb-3 line-clamp-2 break-all'>
                {applicant.bio ?? "No bio provided."}
              </p>
            </div>
            {/* Skills Match */}
            <div className='mb-4'>
              <div className='flex flex-wrap gap-2'>
                {applicant.skills ? (
                  applicant.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={`${skill.name}-${skill.years}`}
                      variant={"default"}
                      className={`text-xs ${"bg-blue-100 text-blue-800 border-blue-200"} max-w-32 truncate`}
                    >
                      {skill.name}
                    </Badge>
                  ))
                ) : (
                  <span className='text-gray-500'>No skills listed</span>
                )}
              </div>
            </div>

            {/* Stats Row */}
            <div className='flex items-center gap-6 mb-4 text-sm'>
              {/* <div className='flex items-center gap-1 text-gray-600'>
                <Briefcase className='h-4 w-4' />
                <span>{applicant.completedJobs} jobs completed</span>
              </div>
              <div className='flex items-center gap-1 text-gray-600'>
                <TrendingUp className='h-4 w-4' />
                <span>{applicant.responseRate} response rate</span>
              </div> */}
              <div className='flex items-center gap-1 text-gray-600'>
                <GraduationCap className='h-4 w-4' />
                <span>{getExperienceLevel(applicant.skills ?? [])}</span>
              </div>
              <div className='flex items-center gap-1 text-gray-600'>
                <Calendar className='h-4 w-4' />
                <span>
                  Applied {formatDateShort(jobApplication.created_at ?? "")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-3 flex-wrap'>
              <Button
                onClick={() =>
                  handleStatusChange(jobApplication.id, "accepted")
                }
                className='bg-green-600 hover:bg-green-700 text-white flex-1'
                size='sm'
              >
                <Check className='h-4 w-4 mr-2' />
                Accept
              </Button>
              <Button
                onClick={() =>
                  handleStatusChange(jobApplication.id, "rejected")
                }
                variant='outline'
                className='border-red-200 text-red-600 hover:bg-red-50 bg-transparent flex-1'
                size='sm'
              >
                <X className='h-4 w-4 mr-2' />
                Reject
              </Button>

              <ApplicantDetailModal
                applicant={applicant}
                jobApplication={jobApplication}
              />
              <Button
                variant='outline'
                size='sm'
                className='bg-transparent flex-1'
              >
                <MessageCircle className='h-4 w-4 mr-2' />
                Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
