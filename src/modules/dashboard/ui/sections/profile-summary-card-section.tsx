import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/auth";
import {
  calculateProfileCompletion,
  getMissingProfileFields,
  progressColor,
} from "@/lib/profile-completion";
import Link from "next/link";

export default function ProfileSummaryCard({
  user,
}: Readonly<{
  user: Session["user"];
}>) {
  const profileCompletion = calculateProfileCompletion(user);
  const missingFields = getMissingProfileFields(user);

  return (
    <section>
      <Card className='bg-gradient-to-r from-blue-600 to-purple-700 text-white border-0 '>
        <CardContent>
          <div className='flex items-center justify-between sm:flex-row flex-col gap-4 sm:gap-0'>
            <div className='flex items-center sm:space-x-4 sm:flex-row text-center sm:text-start flex-col'>
              <Avatar className='h-16 w-16 border-2 border-white/20'>
                <AvatarImage
                  src={user.image ?? "/images/auth-image.jpg"}
                  alt={user.name}
                />
                <AvatarFallback className='bg-white/20 text-white'>
                  SJ
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className='text-xl font-bold'>{user.name}</h2>
                <div className='flex items-center gap-1 mt-1 flex-col min-[370px]:flex-row min-[370px]:gap-4'>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='font-medium text-white'>
                      {user.rating ?? "No Rating"}
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <CheckCircle className='h-4 w-4' />
                    <span className='text-white'>89 jobs completed</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-right'>
              <div className='text-sm opacity-90 mb-2 flex items-center gap-2'>
                Profile Completion
                {missingFields.length > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className='h-3 w-3 cursor-help' />
                      </TooltipTrigger>
                      <TooltipContent side='left' className='max-w-48'>
                        <p className='text-xs mb-1 font-medium'>
                          Missing fields:
                        </p>
                        <ul className='text-xs space-y-0.5'>
                          {missingFields.map((field) => (
                            <li key={field}>• {field}</li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className='flex items-center gap-3'>
                <Progress
                  value={profileCompletion}
                  indicatorColor={progressColor(profileCompletion)}
                  className={`bg-white w-full h-2 `}
                />
              </div>
              {profileCompletion < 100 && (
                <Link href={"/profile"}>
                  <Button
                    variant='secondary'
                    size='sm'
                    className='mt-3 bg-white/20 text-white hover:bg-white/30 border-0'
                  >
                    Complete Profile
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
