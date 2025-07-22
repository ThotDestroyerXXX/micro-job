import { Skeleton } from "@/components/ui/skeleton";

export default function OTPVerificationSkeleton() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-4'>
      <Skeleton className='h-16 w-96' />
      <Skeleton className='h-10 w-[32rem]' />
      <Skeleton className='h-12 w-96' />
      <Skeleton className='h-12 w-96' />
    </div>
  );
}
