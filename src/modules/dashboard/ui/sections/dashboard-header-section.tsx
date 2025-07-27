import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/auth";

export default function DashboardHeader({
  name,
}: Readonly<{ name: Session["user"]["name"] }>) {
  return (
    <header className='flex items-center justify-between gap-4'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>
          Good morning, {name.split(" ")[0]} 👋
        </h1>
        <p className='text-gray-600 mt-1'>
          Here&apos;s what&apos;s happening with your jobs today
        </p>
      </div>
      <div className='flex items-center gap-3'>
        <Button variant='outline' size='sm' className='gap-2 bg-transparent'>
          <Settings className='h-4 w-4' />
        </Button>
      </div>
    </header>
  );
}
