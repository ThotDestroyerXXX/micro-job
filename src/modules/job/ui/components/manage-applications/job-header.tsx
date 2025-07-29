import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { addressDisplay, formatDateShort } from "@/lib/utils";
import { getStatusIcon, JobStatusInfo } from "../../../utils/job-status";
import JobActionsDropdown from "./job-actions-dropdown";

interface JobHeaderProps {
  title: string | null;
  shortDescription: string | null;
  locationType: string | null;
  address: string | null;
  createdAt: Date | null;
  statusInfo: JobStatusInfo;
  jobId: string;
  onAction?: (jobId: string, action: string) => void;
}

export default function JobHeader({
  title,
  shortDescription,
  locationType,
  address,
  createdAt,
  statusInfo,
  jobId,
  onAction,
}: JobHeaderProps) {
  return (
    <div className='flex items-start justify-between mb-4'>
      <div className='flex-1'>
        <div className='flex items-start gap-2 mb-2 justify-between flex-col-reverse min-[400px]:flex-row'>
          <h3 className='text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-all w-full'>
            {title}
          </h3>
          <div className='flex items-center gap-2 min-[400px]:justify-end justify-between w-full flex-0'>
            <Badge variant='outline' className={statusInfo.color}>
              {getStatusIcon(statusInfo.status)}
              <span className='ml-1 capitalize text-black'>
                {statusInfo.status}
              </span>
            </Badge>
            <JobActionsDropdown jobId={jobId} onAction={onAction} />
          </div>
        </div>

        <p className='text-gray-600 text-sm mb-3 line-clamp-2 break-all'>
          {shortDescription}
        </p>

        <div className='flex items-center gap-4 mb-3 text-sm justify-between w-full text-gray-500'>
          <div className='flex items-center gap-1'>
            <MapPin className='h-4 w-4 shrink-0' />
            <span className='line-clamp-1 break-all'>
              {addressDisplay(locationType ?? "", address ?? "")}
            </span>
          </div>
          <div className='flex items-center gap-1 shrink-0'>
            <Calendar className='h-4 w-4 shrink-0' />
            <span>Posted {formatDateShort(createdAt ?? "")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
