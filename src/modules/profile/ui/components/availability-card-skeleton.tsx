import { Skeleton } from "@/components/ui/skeleton";

export default function AvailabilityCardSkeleton() {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md animate-pulse'>
      <div className='flex items-center justify-between mb-4'>
        <Skeleton className='w-1/3 h-6 bg-gray-200 rounded'></Skeleton>
        <Skeleton className='w-1/6 h-6 bg-gray-200 rounded'></Skeleton>
      </div>
      <div className='space-y-2'>
        {[...Array(7)].map((tes) => (
          <Skeleton
            key={tes}
            className='h-4 bg-gray-200 rounded w-full'
          ></Skeleton>
        ))}
      </div>
    </div>
  );
}
