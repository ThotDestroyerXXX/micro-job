import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ManageApplicationHeader() {
  return (
    <div className='flex items-center justify-between mb-8 flex-col min-[400px]:flex-row gap-4'>
      <div className='flex-1 min-[400px]:text-justify text-center '>
        <h1 className='text-4xl font-bold text-gray-900 mb-2'>My Jobs</h1>
        <p className='text-gray-600'>
          Manage your job postings and applications
        </p>
      </div>
      <Link href='/job/create'>
        <Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'>
          <Plus className='h-4 w-4 mr-2' />
          Post New Job
        </Button>
      </Link>
    </div>
  );
}
