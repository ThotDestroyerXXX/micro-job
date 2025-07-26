export default function CreateJobHeader() {
  return (
    <header className='flex items-center justify-between mb-8'>
      <div className='flex items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>Post a Job</h1>
          <p className='text-muted-foreground'>
            Create a new job posting to find the right worker
          </p>
        </div>
      </div>
    </header>
  );
}
