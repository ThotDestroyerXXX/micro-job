import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { paymentType } from "@/db/schema";

export default function ApplyCard({
  budgetAmount,
  paymentTypes,
  applicants,
  workersNeeded,
}: Readonly<{
  budgetAmount: string | null;
  paymentTypes: (typeof paymentType.enumValues)[number] | null;
  applicants: number;
  workersNeeded: number | null;
}>) {
  return (
    <Card className='border-0 shadow-lg bg-white py-6'>
      <CardContent>
        <div className='text-center mb-6'>
          <div className='text-3xl font-bold text-green-600 mb-1'>
            $ {budgetAmount ?? "N/A"}
          </div>
          <div className='text-sm text-gray-600'>
            {paymentTypes === "Hourly" ? "per hour" : "total budget"}
          </div>
        </div>

        <Button
          //   onClick={handleApply}
          className='w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg mb-4'
        >
          Apply Now
        </Button>

        <div className='space-y-3 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>Applications</span>
            <span className='font-medium'>{applicants} submitted</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>Workers needed</span>
            <span className='font-medium'>{workersNeeded}</span>
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
