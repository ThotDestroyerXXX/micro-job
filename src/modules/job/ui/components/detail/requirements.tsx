import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Requirements({
  required_skills,
  experience_level,
  requirements,
}: Readonly<{
  required_skills: string[] | null;
  experience_level: string | null;
  requirements: string | null;
}>) {
  return (
    <TabsContent value='requirements' className='space-y-6'>
      {/* Required Skills */}
      <div>
        <h3 className='text-xl font-semibold text-gray-900 mb-4'>
          Required Skills
        </h3>
        <div className='flex flex-wrap gap-2'>
          {required_skills ? (
            required_skills.map((skill) => (
              <Badge
                key={skill}
                variant='secondary'
                className='bg-blue-50 text-blue-700 px-3 py-1'
              >
                {skill}
              </Badge>
            ))
          ) : (
            <span className='text-gray-500'>No specific skills required</span>
          )}
        </div>
      </div>

      <Separator />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-3'>
          <div className='flex items-center gap-3'>
            <GraduationCap className='h-5 w-5 text-blue-600' />
            <div>
              <div className='font-medium text-gray-900'>Experience Level</div>
              <div className='text-sm text-gray-600'>{experience_level}</div>
            </div>
          </div>
        </div>
        <div className='space-y-3'>
          <div className='flex items-start gap-3'>
            <Award className='h-5 w-5 text-green-600 mt-1 shrink-0' />
            <div>
              <div className='font-medium text-gray-900'>
                Other Requirements
              </div>
              <div className='text-sm text-gray-600 break-all'>
                {requirements ?? (
                  <span className='text-gray-500'>
                    No additional requirements
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
