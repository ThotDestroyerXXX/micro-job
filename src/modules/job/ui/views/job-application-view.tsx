import ApplicantList from "../sections/manage-applications/detail/applicant-list";
import JobApplicationHeader from "../sections/manage-applications/detail/job-application-header";

export default function JobApplicationView({ id }: Readonly<{ id: string }>) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      <div className='max-w-7xl mx-auto p-6'>
        <JobApplicationHeader id={id} />
        <ApplicantList id={id} />
      </div>
    </div>
  );
}
