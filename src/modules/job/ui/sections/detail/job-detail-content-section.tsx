"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { trpc } from "@/trpc/client";
import JobOverview from "../../components/detail/job-overview";
import LocationDetail from "../../components/detail/location-detail";
import Requirements from "../../components/detail/requirements";
import PaymentDetail from "../../components/detail/payment-detail";

export default function JobDetailContent({
  id,
}: Readonly<{
  id: string;
}>) {
  const [data] = trpc.job.getOne.useSuspenseQuery({ jobId: id });
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <Card className='border-0 shadow-lg bg-white/90 backdrop-blur-sm'>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardHeader className='pb-0'>
          <TabsList className='grid w-full h-full grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-4 bg-gray-100'>
            <TabsTrigger
              value='overview'
              className='data-[state=active]:bg-white'
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value='location-time'
              className='data-[state=active]:bg-white'
            >
              Location & Time
            </TabsTrigger>
            <TabsTrigger
              value='requirements'
              className='data-[state=active]:bg-white'
            >
              Requirements
            </TabsTrigger>
            <TabsTrigger
              value='payment'
              className='data-[state=active]:bg-white'
            >
              Payment
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          <JobOverview
            detailedDescription={data.job.description}
            expirationDate={data.job.expires_at}
          />

          <LocationDetail jobs={data.job} />

          <Requirements
            required_skills={data.job.required_skills}
            experience_level={data.job.experience_level}
            requirements={data.job.requirements}
          />

          <PaymentDetail jobs={data.job} />
        </CardContent>
      </Tabs>
    </Card>
  );
}
