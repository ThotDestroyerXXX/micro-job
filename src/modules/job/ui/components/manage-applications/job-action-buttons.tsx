import { Button } from "@/components/ui/button";
import { Users, Eye, Edit } from "lucide-react";
import { JobStatus } from "../../../utils/job-status";

interface JobActionButtonsProps {
  status: JobStatus;
  pendingCount: number;
  jobId: string;
  onAction?: (jobId: string, action: string) => void;
}

export default function JobActionButtons({
  status,
  pendingCount,
  jobId,
  onAction,
}: JobActionButtonsProps) {
  const handleAction = (action: string) => {
    onAction?.(jobId, action);
  };

  return (
    <div className='flex items-center gap-3'>
      {status === "active" && pendingCount > 0 && (
        <Button
          className='flex-1 bg-blue-600 hover:bg-blue-700'
          onClick={() => handleAction("view-applicants")}
        >
          <Users className='h-4 w-4 mr-2' />
          View {pendingCount} Applicant{pendingCount !== 1 ? "s" : ""}
        </Button>
      )}

      {(status === "completed" ||
        status === "expired" ||
        (status === "active" && pendingCount <= 0)) && (
        <Button
          variant='outline'
          className='flex-1 bg-transparent'
          onClick={() => handleAction("view-details")}
        >
          <Eye className='h-4 w-4 mr-2' />
          View Details
        </Button>
      )}

      <Button
        variant='outline'
        size='sm'
        className='bg-transparent'
        onClick={() => handleAction("edit")}
      >
        <Edit className='h-4 w-4' />
      </Button>
    </div>
  );
}
