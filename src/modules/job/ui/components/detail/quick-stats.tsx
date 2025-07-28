import { formatDateShort, getTimeAgo } from "@/lib/utils";
import { Calendar, Clock, Globe } from "lucide-react";

export default function QuickStats({
  createdAt,
  expiresAt,
  isVisible,
}: Readonly<{
  createdAt: Date | null;
  expiresAt: string | null;
  isVisible: boolean | null;
}>) {
  return (
    <div className='flex items-center justify-around flex-wrap gap-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg'>
      <div className='flex items-center gap-1'>
        <Clock className='h-4 w-4' />
        <span>Posted {getTimeAgo(createdAt ?? "")}</span>
      </div>
      <div className='flex items-center gap-1'>
        <Calendar className='h-4 w-4' />
        <span>
          Expires: {expiresAt ? formatDateShort(expiresAt) : "Not specified"}
        </span>
      </div>
      <div className='flex items-center gap-1'>
        <Globe className='h-4 w-4' />
        <span>{isVisible ? "Public" : "Private"} posting</span>
      </div>
    </div>
  );
}
