import { InferSelectModel } from "drizzle-orm";
import { job } from "@/db/schema";
import { JOB_STATS_CONFIG } from "../../../constants/job-card-constants";

interface JobStatsGridProps {
  jobs: InferSelectModel<typeof job> & {
    acceptedCount: number;
    pendingCount: number;
    applicationCount: number;
  };
}

export default function JobStatsGrid({ jobs }: Readonly<JobStatsGridProps>) {
  const getStatValue = (key: string) => {
    switch (key) {
      case "pay_amount":
        return jobs.pay_amount;
      case "applicationCount":
        return jobs.applicationCount;
      case "pendingCount":
        return jobs.pendingCount;
      case "acceptedCount":
        return jobs.acceptedCount;
      default:
        return 0;
    }
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
      {JOB_STATS_CONFIG.map((stat) => {
        const Icon = stat.icon;
        const value = getStatValue(stat.key);
        const label = stat.key === "pay_amount" ? jobs.pay_type : stat.label;

        return (
          <div
            key={stat.key}
            className={`text-center p-3 bg-${stat.colorClass}-50 rounded-lg`}
          >
            <Icon
              className={`h-5 w-5 text-${stat.colorClass}-600 mx-auto mb-1`}
            />
            <div className={`text-lg font-bold text-${stat.colorClass}-900`}>
              {value}
            </div>
            <div className={`text-xs text-${stat.colorClass}-700`}>{label}</div>
          </div>
        );
      })}
    </div>
  );
}
