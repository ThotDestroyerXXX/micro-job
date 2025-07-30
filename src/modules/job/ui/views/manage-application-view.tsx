"use client";
import { useState } from "react";
import { trpc } from "@/trpc/client";
import { getJobStatus } from "../../utils/job-status";
import { useDebouncedCallback } from "use-debounce";
import ManageApplicationHeader from "../sections/manage-applications/manage-application-header-section";
import SummaryStats from "../sections/manage-applications/summary-stats-section";
import JobFilters from "../sections/manage-applications/job-filters";
import JobTabsDisplay from "../sections/manage-applications/job-tabs-display";

export default function ManageApplicationView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");
  const [data] = trpc.job.getOwnJobs.useSuspenseQuery();
  const debouncedSearch = useDebouncedCallback(
    // function
    (value) => {
      setSearchQuery(value);
    },
    // delay in ms
    500
  );

  const getJobsByTab = (tab: string) => {
    return data.jobs.filter((job) => {
      const jobStatus = getJobStatus(
        job.expires_at,
        job.end_date,
        job.acceptedCount
      );

      switch (tab) {
        case "active":
          return jobStatus.status === "active";
        case "completed":
          return jobStatus.status === "completed";
        case "expired":
          return jobStatus.status === "expired";
        default:
          return true; // "all" shows everything
      }
    });
  };

  const filteredJobs = getJobsByTab(activeTab)
    .filter((job) => {
      if (
        searchQuery &&
        !job.title?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (
        selectedCategory !== "All Categories" &&
        job.category !== selectedCategory
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const payA = Number.parseInt((a.pay_amount ?? "0").replace(/[^\d]/g, ""));
      const payB = Number.parseInt((b.pay_amount ?? "0").replace(/[^\d]/g, ""));
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt ?? "").getTime() -
            new Date(b.createdAt ?? "").getTime()
          );
        case "most-applications":
          return b.applicationCount - a.applicationCount;
        case "highest-pay":
          return payB - payA;
        default:
          return 0;
      }
    });

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      <div className='max-w-7xl mx-auto p-6'>
        <ManageApplicationHeader />
        <SummaryStats />

        <JobFilters
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          onSearchChange={debouncedSearch}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortBy}
        />

        <JobTabsDisplay
          activeTab={activeTab}
          onTabChange={setActiveTab}
          filteredJobs={filteredJobs}
          allJobs={data.jobs}
        />
      </div>
    </div>
  );
}
