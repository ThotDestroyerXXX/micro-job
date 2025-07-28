"use client";
import { dayEnum } from "@/db/schema";
import { Suspense, useMemo } from "react";
import { useUpdateUserAvailability } from "../../hooks/use-profile-hook";
import { trpc } from "@/trpc/client";
import { Session } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "@/components/not-found";
import AvailabilityCardSkeleton from "./availability-card-skeleton";

export default function AvailabilityCardSuspense({
  user,
  loading,
  setLoading,
}: Readonly<{
  user: Session["user"];
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>) {
  return (
    <Suspense fallback={<AvailabilityCardSkeleton />}>
      <ErrorBoundary fallback={<NotFound message='Internal Server Error' />}>
        <AvailabilityCard
          user={user}
          setLoading={setLoading}
          loading={loading}
        />
      </ErrorBoundary>
    </Suspense>
  );
}

function AvailabilityCard({
  user,
  loading,
  setLoading,
}: Readonly<{
  user: Session["user"];
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>) {
  const [data] = trpc.profile.getUserAvailability.useSuspenseQuery({
    userId: user.id,
  });
  const availabilityMap = useMemo(() => {
    const map = new Map();
    data?.forEach((day) => {
      map.set(day.day_of_week, day);
    });
    return map;
  }, [data]);

  const { updateUserAvailability } = useUpdateUserAvailability({
    setLoading,
  });

  return (
    <div className='grid grid-cols-2 min-[400px]:grid-cols-4 md:grid-cols-7 gap-2 text-sm'>
      {dayEnum.enumValues.map((dayName, index) => {
        // Find the corresponding day data from tRPC fetch
        const dayData = availabilityMap.get(dayName);

        return (
          <div key={`${dayName}-${index}`} className='text-center'>
            <div className='font-medium mb-1'>{dayName}</div>
            <Button
              className={`p-2 rounded w-full ${
                dayData && !dayData.isBusy
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }`}
              onClick={() => {
                updateUserAvailability({
                  userId: user.id,
                  dayOfWeek: dayName,
                  isBusy: dayData ? !dayData.isBusy : false,
                });
              }}
              disabled={loading}
            >
              {dayData && !dayData.isBusy ? "Available" : "Busy"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
