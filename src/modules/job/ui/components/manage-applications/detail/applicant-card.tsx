import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  Star,
  MapPin,
  GraduationCap,
  Calendar,
  Check,
  X,
  Eye,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InferSelectModel } from "drizzle-orm";
import { job_application, user } from "@/db/schema";
import UserAvatar from "@/components/user-avatar";
import { getApplicationStatusColor } from "@/modules/job/utils/job-status";
import { formatDateShort, getExperienceLevel } from "@/lib/utils";

export default function ApplicantCard({
  applicant,
  jobApplication,
}: Readonly<{
  applicant: InferSelectModel<typeof user>;
  jobApplication: InferSelectModel<typeof job_application>;
}>) {
  return (
    <Card className='hover:shadow-lg transition-all duration-300 border-0 bg-white'>
      <CardContent className='p-6'>
        <div className='flex items-start gap-4'>
          {/* Avatar */}
          <UserAvatar image={applicant.image} alt={applicant.name} />

          {/* Main Content */}
          <div className='flex-1'>
            <div className='flex items-start justify-between mb-3'>
              <div>
                <div className='flex items-center gap-3 mb-1'>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {applicant.name}
                  </h3>
                  <Badge
                    className={`${getApplicationStatusColor(jobApplication.status ?? "")} border-0`}
                  >
                    {jobApplication.status ?? "Unknown"}
                  </Badge>
                </div>
                <div className='flex items-center gap-4 text-sm text-gray-600 mb-2'>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='font-medium'>{applicant.rating}</span>
                    {/* <span>({applicant.totalReviews} reviews)</span> */}
                  </div>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-4 w-4' />
                    <span>{applicant.location}</span>
                  </div>
                </div>
                <p className='text-gray-700 mb-3 line-clamp-2'>
                  {applicant.bio}
                </p>
              </div>
            </div>

            {/* Skills Match */}
            <div className='mb-4'>
              <div className='flex flex-wrap gap-2'>
                {applicant.skills?.map((skill) => (
                  <Badge
                    key={`${skill.name}-${skill.years}`}
                    variant={"default"}
                    className={`text-xs ${"bg-blue-100 text-blue-800 border-blue-200"}`}
                  >
                    {skill.name}
                  </Badge>
                ))}
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
            <div className='flex items-center gap-3'>
              <Button
                // onClick={() => handleStatusChange(applicant.id, "accepted")}
                className='bg-green-600 hover:bg-green-700 text-white'
                size='sm'
              >
                <Check className='h-4 w-4 mr-2' />
                Accept
              </Button>
              <Button
                // onClick={() => handleStatusChange(applicant.id, "rejected")}
                variant='outline'
                className='border-red-200 text-red-600 hover:bg-red-50 bg-transparent'
                size='sm'
              >
                <X className='h-4 w-4 mr-2' />
                Reject
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-transparent'
                  >
                    <Eye className='h-4 w-4 mr-2' />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
                  {/* <ApplicantDetailModal applicant={applicant} /> */}
                </DialogContent>
              </Dialog>
              <Button variant='outline' size='sm' className='bg-transparent'>
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
