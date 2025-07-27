import JobHeader from "../sections/job-header-section";
import JobListSection from "../sections/job-list-section";

export default function JobView() {
  return (
    <div className='min-h-screen max-w-7xl mx-auto relative'>
      <div className='p-6'>
        <JobHeader />
        <JobListSection />
      </div>
    </div>
  );
}
