import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { InferSelectModel } from "drizzle-orm";
import { user } from "@/db/schema";
import { formatDateShort } from "@/lib/utils";

export default function EmployerCard({
  users,
  jobsCompleted,
  jobsPosted,
}: Readonly<{
  users: InferSelectModel<typeof user>;
  jobsCompleted: number;
  jobsPosted: number;
}>) {
  return (
    <Card className='border-0 shadow-lg bg-white py-6'>
      <CardHeader>
        <CardTitle className='text-lg'>About the Employer</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center gap-4'>
          <UserAvatar image={users.image} alt={users.name} />
          <div>
            <div className='flex items-center gap-2'>
              <h3 className='font-semibold text-gray-900 break-all'>
                {users.name}
              </h3>
              {users.emailVerified && users.phoneNumberVerified && (
                <Shield className='h-4 w-4 text-blue-500' />
              )}
            </div>
            <div className='flex items-center gap-1 mt-1'>
              <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
              <span className='font-medium'>{users.rating ?? "N/A"}</span>
              {/* <span className='text-sm text-gray-500'>
                ({users.} reviews)
              </span> */}
            </div>
          </div>
        </div>

        <p className='text-sm text-gray-700 leading-relaxed break-all'>
          {users.bio}
        </p>

        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div>
            <div className='text-gray-600'>Member since</div>
            <div className='font-medium'>
              {formatDateShort(users.createdAt)}
            </div>
          </div>
          <div>
            <div className='text-gray-600'>Jobs posted</div>
            <div className='font-medium'>{jobsPosted}</div>
          </div>
          <div>
            <div className='text-gray-600'>Completed</div>
            <div className='font-medium'>{jobsCompleted}</div>
          </div>
        </div>

        <Button variant='outline' size={"lg"} className='w-full bg-transparent'>
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}
