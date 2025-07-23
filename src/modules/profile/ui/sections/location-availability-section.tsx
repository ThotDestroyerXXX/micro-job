"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { MapPin } from "lucide-react";
import { useChangeAcceptingJobs } from "../../hooks/use-profile-hook";
import { Session } from "@/lib/auth";
import { useState } from "react";
import AvailabilityCardSuspense from "../components/availability-card";

export default function LocationAvailabilitySection({
  user,
}: Readonly<{
  user: Session["user"];
}>) {
  const [loading, setLoading] = useState(false);

  const { changeAcceptingJobs } = useChangeAcceptingJobs({
    setLoading,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <MapPin className='h-5 w-5' />
          Location & Availability
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <h4 className='font-medium mb-2'>Service Area</h4>
          <p className='text-gray-600'>
            {user.location ?? "No location specified."}
          </p>
        </div>

        <div>
          <h4 className='font-medium mb-2'>Weekly Availability</h4>
          <AvailabilityCardSuspense
            user={user}
            setLoading={setLoading}
            loading={loading}
          />
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <h4 className='font-medium'>Accepting New Jobs</h4>
            <p className='text-sm text-muted-foreground'>
              Toggle your availability status
            </p>
          </div>
          <Switch
            checked={user.isAcceptingJobs ?? false}
            onCheckedChange={() =>
              changeAcceptingJobs(user.id, !user.isAcceptingJobs)
            }
            disabled={loading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
