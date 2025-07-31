"use client";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Briefcase,
  DollarSign,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { InferSelectModel } from "drizzle-orm";
import { job } from "@/db/schema";
import { addressDisplay } from "@/lib/utils";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { useSubmitApplicationForm } from "@/modules/job/hooks/use-job-hook";
import { Textarea } from "@/components/ui/textarea";

export default function ReasonModal({
  jobs,
}: Readonly<{
  jobs: InferSelectModel<typeof job>;
}>) {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const { form, onSubmit, isLoading } = useSubmitApplicationForm();
  return (
    <Dialog
      open={showApplicationModal || isLoading}
      onOpenChange={setShowApplicationModal}
    >
      <DialogTrigger asChild>
        <Button className='w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg mb-4'>
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Apply for this Job</DialogTitle>
          <DialogDescription>
            Tell the employer why you&apos;re the perfect fit for &Prime;
            {jobs.title}&Prime;
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => onSubmit(values, jobs.id))}
          >
            <div className='space-y-6 py-4'>
              {/* Job Summary */}
              <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
                <div className='flex items-center gap-3 mb-2'>
                  <Briefcase className='h-5 w-5 text-blue-600 shrink-0' />
                  <h3 className='font-semibold text-blue-900'>{jobs.title}</h3>
                </div>
                <div className='flex items-center gap-4 text-sm text-blue-700'>
                  <span className='flex items-center gap-1'>
                    <DollarSign className='h-4 w-4 shrink-0' />
                    {jobs.pay_amount}/
                    {jobs.pay_type === "Hourly" ? "hour" : "total"}
                  </span>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-4 w-4 shrink-0 text-gray-500' />
                    <span className='line-clamp-1'>
                      {addressDisplay(
                        jobs.location_type ?? "",
                        jobs.address ?? ""
                      )}
                    </span>
                  </div>
                  <span className='flex items-center gap-1'>
                    <Clock className='h-4 w-4 shrink-0' />
                    {jobs.job_type}
                  </span>
                </div>
              </div>

              {/* Cover Letter */}
              <div className='space-y-2'>
                <FormItem>
                  <FormLabel className='text-base font-medium'>
                    Why do you want this job?
                  </FormLabel>
                  <Textarea
                    {...form.register("coverLetter")}
                    placeholder="Tell the employer why you're interested in this job and what makes you the right person for it. Mention your relevant experience, skills, and what you can bring to this role..."
                  />
                </FormItem>
                <p className='text-xs text-gray-500'>max. 1000 characters</p>
              </div>

              {/* Skills Match */}
              <div className='space-y-2'>
                <Label className='text-base font-medium'>Required Skills</Label>
                <div className='flex flex-wrap gap-2'>
                  {jobs.required_skills?.map((skill) => (
                    <Badge
                      key={skill}
                      variant='secondary'
                      className='bg-blue-50 text-blue-700 px-3 py-1'
                    >
                      <CheckCircle className='h-3 w-3 mr-1' />
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className='text-xs text-gray-500'>
                  Make sure to mention your experience with these skills in your
                  cover letter
                </p>
              </div>

              {/* Application Tips */}
              <div className='p-4 bg-green-50 rounded-lg border border-green-200'>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                    <CheckCircle className='h-4 w-4 text-green-600' />
                  </div>
                  <div>
                    <h4 className='font-medium text-green-900 mb-2'>
                      💡 Tips for a strong application
                    </h4>
                    <ul className='text-sm text-green-800 space-y-1'>
                      <li>• Be specific about your relevant experience</li>
                      <li>
                        • Mention why you&apos;re interested in this particular
                        job
                      </li>
                      <li>• Show enthusiasm and professionalism</li>
                      <li>
                        • Be realistic about your availability and timeline
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between pt-4 border-t'>
              <Button
                variant='outline'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowApplicationModal(false);
                }}
                disabled={isLoading}
                className='bg-transparent'
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                type='submit'
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[140px]'
              >
                {isLoading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className='h-4 w-4 mr-2' />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
