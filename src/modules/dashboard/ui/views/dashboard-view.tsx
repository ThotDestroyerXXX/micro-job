import { Session } from "@/lib/auth";
import DashboardHeader from "../sections/dashboard-header-section";
import ProfileSummaryCard from "../sections/profile-summary-card-section";
import QuickAction from "../sections/quick-action-section";
import RecentActivity from "../sections/recent-activity-section";
import UpcomingJob from "../sections/upcoming-job-section";
import RecommendedJob from "../sections/recommended-job-section";

export default function DashboardView({
  user,
}: Readonly<{
  user: Session["user"];
}>) {
  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto p-6 space-y-8'>
        <DashboardHeader name={user.name} />
        <ProfileSummaryCard user={user} />
        <QuickAction />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <RecentActivity />
          <RecommendedJob />
        </div>
        <UpcomingJob />
      </div>
    </div>
  );
}
