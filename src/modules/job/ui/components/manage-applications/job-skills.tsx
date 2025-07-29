import { Badge } from "@/components/ui/badge";

interface JobSkillsProps {
  skills: string[] | null;
  maxVisible?: number;
}

export default function JobSkills({ skills, maxVisible = 3 }: JobSkillsProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  const visibleSkills = skills.slice(0, maxVisible);
  const remainingCount = skills.length - maxVisible;

  return (
    <div className='flex flex-wrap gap-2 mb-4'>
      {visibleSkills.map((skill: string) => (
        <Badge
          key={skill}
          variant='secondary'
          className='text-xs bg-gray-100 text-gray-700'
        >
          {skill}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge
          variant='secondary'
          className='text-xs bg-gray-100 text-gray-600'
        >
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
}
