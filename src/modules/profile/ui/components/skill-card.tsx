import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import YearsSelect from "./years-select";

interface Skill {
  name: string;
  years: number;
}

interface SkillCardProps {
  skill: Skill;
  isEditing?: boolean;
  onRemove?: (skillName: string) => void;
  onUpdateYears?: (skillName: string, years: number) => void;
}

export function SkillCard({
  skill,
  isEditing = false,
  onRemove,
  onUpdateYears,
}: Readonly<SkillCardProps>) {
  if (isEditing) {
    return (
      <div className='group flex items-center justify-between p-3 border rounded-lg hover:border-gray-300 transition-colors bg-white'>
        <div className='flex-1 min-w-0'>
          <div className='font-medium text-sm truncate'>{skill.name}</div>
          <div className='text-xs text-muted-foreground'>
            {skill.years} {skill.years === 1 ? "year" : "years"} experience
          </div>
        </div>
        <div className='flex items-center gap-2 ml-3'>
          {onUpdateYears && (
            <YearsSelect skill={skill} handleUpdateSkillYears={onUpdateYears} />
          )}
          {onRemove && (
            <Button
              onClick={() => onRemove(skill.name)}
              className='size-6 p-0 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center justify-center text-xs'
            >
              ×
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='group relative p-4 border rounded-lg hover:border-gray-300 transition-all hover:shadow-sm bg-white'>
      <div className='flex items-start justify-between'>
        <div className='flex-1 min-w-0'>
          <div className='font-medium text-sm mb-1 truncate'>{skill.name}</div>
          <div className='flex items-center gap-2'>
            <div className='text-xs text-muted-foreground'>
              {skill.years} {skill.years === 1 ? "year" : "years"}
            </div>
            <div className='flex-1 bg-gray-100 rounded-full h-1.5'>
              <Progress
                value={Math.min((skill.years / 10) * 100, 100)}
                className='w-full h-1.5'
                indicatorColor='bg-primary'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
