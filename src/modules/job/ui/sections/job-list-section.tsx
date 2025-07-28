"use client";
import { useMemo, useState } from "react";
import JobSort from "../components/job-sort";
import ViewModeToggle from "../components/view-mode-toogle";
import { trpc } from "@/trpc/client";
import { Card } from "@/components/ui/card";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobCard from "../components/job-card";
import JobFilter from "../components/job-filter";
import Link from "next/link";

export default function JobList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedJobType, setSelectedJobType] = useState("All Types");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [payRange, setPayRange] = useState<[number, number]>([0, 10000]);

  const [data] = trpc.job.getAll.useSuspenseQuery();

  const filteredJobs = useMemo(() => {
    const filtered = data.filter((job) => {
      // Category filter
      if (
        selectedCategory !== "All Categories" &&
        job.job.category !== selectedCategory
      ) {
        return false;
      }

      // Job type filter
      if (
        selectedJobType !== "All Types" &&
        job.job.job_type !== selectedJobType
      ) {
        return false;
      }

      // Location filter
      if (selectedLocation !== "All Locations") {
        if (
          selectedLocation === "Remote" &&
          job.job.location_type !== "remote"
        ) {
          return false;
        }
      }

      // Pay range filter
      const payAmount = Number.parseInt(job.job.pay_amount ?? "TBA");
      if (payAmount < payRange[0] || payAmount > payRange[1]) {
        return false;
      }

      return true;
    });

    // Sort jobs
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.job.updatedAt ?? "").getTime() -
            new Date(a.job.updatedAt ?? "").getTime()
        );
        break;
      case "highest-pay":
        filtered.sort((a, b) => {
          const payA = Number.parseInt(
            a.job.pay_amount?.replace(/[^\d]/g, "") ?? "0"
          );
          const payB = Number.parseInt(
            b.job.pay_amount?.replace(/[^\d]/g, "") ?? "0"
          );
          return payB - payA;
        });
        break;
      case "deadline":
        filtered.sort(
          (a, b) =>
            new Date(a.job.expires_at ?? "").getTime() -
            new Date(b.job.expires_at ?? "").getTime()
        );
        break;
    }

    return filtered;
  }, [
    data,
    sortBy,
    selectedCategory,
    selectedJobType,
    selectedLocation,
    payRange,
  ]);

  return (
    <>
      <div className='flex items-center justify-between gap-4 mb-8'>
        <JobSort setSortBy={setSortBy} sortBy={sortBy} />
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className='flex gap-8'>
        <JobFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedJobType={selectedJobType}
          setSelectedJobType={setSelectedJobType}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          payRange={payRange}
          setPayRange={setPayRange}
        />
        <div className='flex-1'>
          {filteredJobs.length === 0 ? (
            <Card className='p-16 text-center shadow-lg border-0 bg-white'>
              <div className='text-gray-400'>
                <Search className='h-16 w-16 mx-auto mb-6 opacity-50' />
                <h3 className='text-2xl font-bold text-gray-600 mb-4'>
                  No Perfect Matches Yet
                </h3>
                <p className='text-lg mb-6'>
                  Try adjusting your filters or search terms to discover more
                  opportunities
                </p>
              </div>
            </Card>
          ) : (
            <div
              className={`space-y-6 ${viewMode === "grid" ? "grid grid-cols-1 xl:grid-cols-2 gap-8" : "flex flex-col w-full"}`}
            >
              {filteredJobs.map((job) => (
                <Link key={job.job.id} href={`/job/${job.job.id}`}>
                  <JobCard
                    job={job.job}
                    userJob={job.user}
                    viewMode={viewMode}
                    isSaved={job.isSaved}
                  />
                </Link>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredJobs.length > 0 && (
            <div className='mt-12 text-center'>
              <Button
                size='lg'
                variant='outline'
                className='bg-white shadow-lg hover:shadow-xl transition-shadow'
              >
                Load More Opportunities
                <ChevronDown className='h-4 w-4 ml-2' />
              </Button>
              <p className='text-sm text-gray-500 mt-3'>
                Showing {filteredJobs.length} of 500+ available jobs
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
