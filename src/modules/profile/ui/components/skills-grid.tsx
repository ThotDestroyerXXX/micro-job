import { Skill } from "@/lib/utils";
import { SkillCard } from "./skill-card";

interface SkillsGridProps {
  skills: Skill[];
  isEditing?: boolean;
  onRemoveSkill?: (skillName: string) => void;
  onUpdateSkillYears?: (skillName: string, years: number) => void;
}

export function SkillsGrid({
  skills,
  isEditing = false,
  onRemoveSkill,
  onUpdateSkillYears,
}: Readonly<SkillsGridProps>) {
  if (skills.length === 0) {
    return (
      <div
        className={`col-span-full text-center py-8 text-muted-foreground ${
          isEditing ? "col-span-2" : "col-span-3"
        }`}
      >
        <div className='text-sm'>No skills added yet</div>
        {isEditing && (
          <div className='text-xs mt-1'>
            Add your first skill above to get started
          </div>
        )}
      </div>
    );
  }

  const gridCols = isEditing
    ? "grid-cols-1 md:grid-cols-2"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-3`}>
      {skills.map((skill, index) => (
        <SkillCard
          key={`${skill.name}-${index}`}
          skill={skill}
          isEditing={isEditing}
          onRemove={onRemoveSkill}
          onUpdateYears={onUpdateSkillYears}
        />
      ))}
    </div>
  );
}
