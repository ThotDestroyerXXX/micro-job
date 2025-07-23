import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SkillSection({
  profileData,
}: Readonly<{
  profileData: { skills: string[] };
}>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Capabilities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <h4 className='font-medium mb-2'>Skills</h4>
            <div className='flex flex-wrap gap-2'>
              {profileData.skills.map((skill) => (
                <Badge key={skill} variant='default'>
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className='font-medium mb-2'>Experience Level</h4>
            <Badge variant='outline'>Intermediate</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
