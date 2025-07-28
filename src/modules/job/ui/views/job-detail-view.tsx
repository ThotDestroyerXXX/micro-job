import JobDetailBasicInformationCard from "../sections/detail/job-detail-basic-information-card";
import JobDetailContentSection from "../sections/detail/job-detail-content-section";
import JobDetailSidebar from "../sections/detail/job-detail-sidebar";

export default function JobDetailView({ id }: Readonly<{ id: string }>) {
  return (
    <div className='min-h-screen'>
      <div className='max-w-6xl mx-auto p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-6'>
            <JobDetailBasicInformationCard id={id} />
            <JobDetailContentSection id={id} />
          </div>
          <JobDetailSidebar id={id} />
        </div>
      </div>
    </div>
  );
}
