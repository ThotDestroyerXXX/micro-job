import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import {
  useToggleSaveJob,
  useToggleSaveJobForDetail,
} from "@/modules/job/hooks/use-job-hook";

export default function HeartSave({
  jobId,
  isSaved,
  isDetail = false,
}: Readonly<{
  jobId: string;
  isSaved: boolean;
  isDetail?: boolean;
}>) {
  const { toggleSaveJob } = useToggleSaveJob();
  const { toggle } = useToggleSaveJobForDetail(jobId);
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isDetail) return toggle();
        toggleSaveJob(jobId);
      }}
      className='p-2 hover:bg-red-50 shrink-0 transition-colors'
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          isSaved
            ? "text-red-500 fill-red-500 hover:text-red-600 hover:fill-red-600"
            : "text-gray-400 hover:text-red-500"
        }`}
      />
    </Button>
  );
}
