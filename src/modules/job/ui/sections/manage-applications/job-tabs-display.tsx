import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { differenceInHours } from "date-fns";
import ManageJobCard from "../../components/manage-applications/manage-job-card";
import { InferSelectModel } from "drizzle-orm";
import { job } from "@/db/schema";

interface JobTabsDisplayProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  filteredJobs: (InferSelectModel<typeof job> & {
    acceptedCount: number;
    pendingCount: number;
    applicationCount: number;
  })[];
  allJobs: (InferSelectModel<typeof job> & {
    acceptedCount: number;
    pendingCount: number;
    applicationCount: number;
  })[];
}

export default function JobTabsDisplay({
  activeTab,
  onTabChange,
  filteredJobs,
  allJobs,
}: JobTabsDisplayProps) {
  const getTabCount = (tabType: string) => {
    switch (tabType) {
      case "all":
        return allJobs.length;
      case "active":
        return allJobs.filter(
          (j) =>
            differenceInHours(new Date(j.expires_at ?? ""), new Date()) >= 0
        ).length;
      case "completed":
        return allJobs.filter(
          (j) =>
            differenceInHours(new Date(j.end_date ?? ""), new Date()) < 0 &&
            j.acceptedCount > 0
        ).length;
      case "expired":
        return allJobs.filter(
          (j) =>
            differenceInHours(new Date(j.expires_at ?? ""), new Date()) < 0 &&
            j.acceptedCount <= 0
        ).length;
      default:
        return 0;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className='mb-6'>
      <TabsList className='grid w-full sm:grid-cols-4 grid-cols-2 h-full bg-white shadow-lg border-0'>
        <TabsTrigger
          value='all'
          className='data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700'
        >
          All Jobs ({getTabCount("all")})
        </TabsTrigger>
        <TabsTrigger
          value='active'
          className='data-[state=active]:bg-green-50 data-[state=active]:text-green-700'
        >
          Active ({getTabCount("active")})
        </TabsTrigger>
        <TabsTrigger
          value='completed'
          className='data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700'
        >
          Completed ({getTabCount("completed")})
        </TabsTrigger>
        <TabsTrigger
          value='expired'
          className='data-[state=active]:bg-red-50 data-[state=active]:text-red-700'
        >
          Expired ({getTabCount("expired")})
        </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className='mt-6'>
        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <Card className='border-0 shadow-lg bg-white p-16 text-center'>
            <Briefcase className='h-16 w-16 mx-auto mb-6 text-gray-400' />
            <h3 className='text-2xl font-bold text-gray-600 mb-4'>
              {activeTab === "all" ? "No jobs found" : `No ${activeTab} jobs`}
            </h3>
            <p className='text-gray-500 mb-6'>
              {activeTab === "all"
                ? "Get started by posting your first job"
                : `You don't have any ${activeTab} jobs yet`}
            </p>
            {activeTab === "all" && (
              <Button className='bg-gradient-to-r from-blue-600 to-purple-600'>
                <Plus className='h-4 w-4 mr-2' />
                Post Your First Job
              </Button>
            )}
          </Card>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {filteredJobs.map((job) => (
              <ManageJobCard key={job.id} jobs={job} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
