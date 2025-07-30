import { AlertCircle } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import { EXPIRATION_WARNING_DAYS } from "../../../constants/job-card-constants";

interface ExpirationWarningProps {
  expiresAt: string | null;
  isActive: boolean;
}

export default function ExpirationWarning({
  expiresAt,
  isActive,
}: Readonly<ExpirationWarningProps>) {
  if (!isActive || !expiresAt) {
    return null;
  }

  const expirationTime = new Date(expiresAt).getTime();
  const currentTime = Date.now();
  const warningThreshold = EXPIRATION_WARNING_DAYS * 24 * 60 * 60 * 1000;

  const shouldShowWarning = expirationTime - currentTime < warningThreshold;

  if (!shouldShowWarning) {
    return null;
  }

  return (
    <div className='mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2'>
      <AlertCircle className='h-4 w-4 text-orange-600' />
      <span className='text-sm text-orange-800'>
        Expires on {formatDateShort(expiresAt)}
      </span>
    </div>
  );
}
