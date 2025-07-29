"use client";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import { SUMMARY_STATS } from "@/modules/job/constants/summary-stats";

export default function SummaryStats() {
  const [{ summary }] = trpc.job.getOwnJobs.useSuspenseQuery();

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
      {SUMMARY_STATS.map((stat) => {
        const Icon = stat.icon;
        const value = summary[stat.key];
        return (
          <Card key={stat.label} className='border-0 shadow-lg bg-white'>
            <CardContent className=' text-center p-0'>
              <div
                className={`w-12 h-12 bg-${stat.colorClass}-100 rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                <Icon className={`h-6 w-6 text-${stat.colorClass}-600`} />
              </div>
              <div
                className={`text-3xl font-bold text-${stat.colorClass}-900 mb-1`}
              >
                {value}
              </div>
              <div className={`text-sm text-${stat.colorClass}-700`}>
                {stat.label}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
