import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { job } from "@/db/schema";
import ReasonModal from "./reason-modal";
import { InferSelectModel } from "drizzle-orm";

export default function ApplyCard({
  applicants,
  jobs,
  isApplied,
}: Readonly<{
  applicants: number;
  jobs: InferSelectModel<typeof job>;
  isApplied: boolean;
}>) {
  return (
    <Card className='border-0 shadow-lg bg-white py-6'>
      <CardContent>
        <div className='text-center mb-6'>
          <div className='text-3xl font-bold text-green-600 mb-1'>
            $ {jobs.pay_amount ?? "N/A"}
          </div>
          <div className='text-sm text-gray-600'>
            {jobs.pay_type === "Hourly" ? "per hour" : "total budget"}
          </div>
        </div>
        {isApplied ? (
          <Button
            disabled
            className='w-full h-12 text-lg font-semibold bg-gray-600 cursor-not-allowed mb-4'
          >
            Already Applied
          </Button>
        ) : (
          <ReasonModal jobs={jobs} />
        )}

        <div className='space-y-3 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>Applications</span>
            <span className='font-medium'>{applicants} submitted</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>Workers needed</span>
            <span className='font-medium'>{jobs.workers_needed}</span>
          </div>
        </div>

        <Separator className='my-4' />

        <div className='flex gap-2'>
          <Button variant='outline' size='sm' className='flex-1 bg-transparent'>
            <MessageCircle className='h-4 w-4 mr-2' />
            Message
          </Button>
          <Button variant='outline' size='sm' className='flex-1 bg-transparent'>
            <Phone className='h-4 w-4 mr-2' />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
