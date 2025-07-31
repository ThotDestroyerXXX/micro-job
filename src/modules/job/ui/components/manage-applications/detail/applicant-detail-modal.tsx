import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import UserAvatar from "@/components/user-avatar";
import {
  User,
  Star,
  Mail,
  Award,
  CheckCircle,
  Check,
  X,
  MessageCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InferSelectModel } from "drizzle-orm";
import { job_application, user, user_availability } from "@/db/schema";
import { getExperienceLevel } from "@/lib/utils";

export default function ApplicantDetailModal({
  applicant,
  jobApplication,
}: Readonly<{
  applicant: InferSelectModel<typeof user> & {
    availability: InferSelectModel<typeof user_availability>[];
  };
  jobApplication: InferSelectModel<typeof job_application>;
}>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='bg-transparent flex-1'>
          <Eye className='h-4 w-4 mr-2' />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-7xl max-h-[90vh] overflow-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Applicant Details</DialogTitle>
          <DialogDescription>
            Complete profile and application information
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Profile Section */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-4'>
                  <UserAvatar image={applicant.image} alt={applicant.name} />
                  <div>
                    <h3 className='text-xl font-semibold'>{applicant.name}</h3>
                    <div className='flex items-center gap-1 mt-1'>
                      <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                      <span className='font-medium'>
                        {applicant.rating ?? "N/A"}
                      </span>
                      {/* <span className='text-gray-500'>
                      ({applicant.totalReviews} reviews)
                    </span> */}
                    </div>
                    <p className='text-gray-600 mt-1 break-all'>
                      {applicant.location}
                    </p>
                  </div>
                </div>
                <p className='text-gray-700 leading-relaxed break-all'>
                  {applicant.bio}
                </p>
              </CardContent>
            </Card>

            {/* Cover Letter */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Mail className='h-5 w-5' />
                  Cover Letter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-700 leading-relaxed'>
                  {jobApplication.application_reason ||
                    "No cover letter provided."}
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Award className='h-5 w-5' />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {applicant.skills ? (
                    applicant.skills.map((skill, index) => (
                      <Badge
                        key={`${skill.name}-${index}`}
                        variant={"default"}
                        className={`bg-blue-100 text-blue-800 border-blue-200 truncate max-w-full`}
                      >
                        {skill.name}
                      </Badge>
                    ))
                  ) : (
                    <span className='text-gray-500'>No skills listed</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Quick Stats */}
            <Card className='py-6'>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-2 gap-3 text-sm'>
                  <div>
                    <div className='text-gray-600'>Experience</div>
                    <div className='font-medium'>
                      {getExperienceLevel(applicant.skills ?? [])}
                    </div>
                  </div>
                  <div>
                    <div className='text-gray-600'>Jobs Done</div>
                    <div className='font-medium'>89</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  {applicant.availability &&
                  applicant.availability.length > 0 ? (
                    applicant.availability.map((availability) => (
                      <div
                        key={`${availability.day_of_week}-${availability.isBusy}`}
                      >
                        {!availability.isBusy && (
                          <div className='flex items-center gap-2 text-sm'>
                            <CheckCircle className='h-4 w-4 text-green-600' />
                            <span>{availability.day_of_week}</span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <span className='text-gray-500'>
                      No availability specified
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className='space-y-3'>
                <Button
                  // onClick={() => handleStatusChange(applicant.id, "accepted")}
                  className='w-full bg-green-600 hover:bg-green-700'
                  size={"lg"}
                >
                  <Check className='h-4 w-4 mr-2' />
                  Accept Application
                </Button>
                <Button
                  // onClick={() => handleStatusChange(applicant.id, "rejected")}
                  variant='outline'
                  className='w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent'
                  size={"lg"}
                >
                  <X className='h-4 w-4 mr-2' />
                  Reject Application
                </Button>
                <Button
                  variant='outline'
                  className='w-full bg-transparent'
                  size={"lg"}
                >
                  <MessageCircle className='h-4 w-4 mr-2' />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
