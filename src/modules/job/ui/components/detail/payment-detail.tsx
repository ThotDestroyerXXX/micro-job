import { TabsContent } from "@/components/ui/tabs";
import { job } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { DollarSign, Briefcase, CheckCircle } from "lucide-react";

export default function PaymentDetail({
  jobs,
}: Readonly<{ jobs: InferSelectModel<typeof job> }>) {
  return (
    <TabsContent value='payment' className='space-y-6'>
      {/* Payment Details */}
      <div>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>
          Payment Information
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div className='flex items-center gap-3 p-4 bg-green-50 rounded-lg'>
              <DollarSign className='h-6 w-6 text-green-600' />
              <div>
                <div className='font-medium text-green-900'>Payment Type</div>
                <div className='text-green-700'>{jobs.pay_type}</div>
              </div>
            </div>
            <div className='flex items-center gap-3 p-4 bg-blue-50 rounded-lg'>
              <Briefcase className='h-6 w-6 text-blue-600' />
              <div>
                <div className='font-medium text-blue-900'>Budget Amount</div>
                <div className='text-blue-700 text-xl font-bold'>
                  $ {jobs.pay_amount ?? "N/A"}
                  <span className='text-sm font-normal ml-1'>
                    {jobs.pay_type === "Hourly" ? "per hour" : "total"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center gap-3 p-4 bg-purple-50 rounded-lg'>
              <CheckCircle className='h-6 w-6 text-purple-600' />
              <div>
                <div className='font-medium text-purple-900'>
                  Payment Method
                </div>
                <div className='text-purple-700'>
                  {jobs.preferred_payment_method ?? "Not specified"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
