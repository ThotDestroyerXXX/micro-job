import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import YearsSelect from "./years-select";

interface Skill {
  name: string;
  years: number;
}

interface AddSkillFormProps {
  newSkill: Skill;
  onSkillChange: (skill: Skill) => void;
  onAddSkill: () => void;
  existingSkills: Skill[];
}

export function AddSkillForm({
  newSkill,
  onSkillChange,
  onAddSkill,
  existingSkills,
}: Readonly<AddSkillFormProps>) {
  const isDuplicate = existingSkills.some(
    (skill) => skill.name.toLowerCase() === newSkill.name.trim().toLowerCase()
  );

  const isDisabled = !newSkill.name.trim() || isDuplicate;

  return (
    <div className='flex gap-3 items-center p-2 border border-dashed border-gray-300 rounded-lg bg-gray-50/50'>
      <Input
        value={newSkill.name}
        onChange={(e) =>
          onSkillChange({
            ...newSkill,
            name: e.target.value,
          })
        }
        placeholder='Enter skill name...'
        className='flex-1 border-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground'
      />
      <YearsSelect
        skill={newSkill}
        handleUpdateSkillYears={(name, years) => onSkillChange({ name, years })}
      />
      <Button
        onClick={onAddSkill}
        size='sm'
        disabled={isDisabled}
        className='h-9 px-4'
      >
        Add
      </Button>
      {isDuplicate && newSkill.name.trim() && (
        <span className='text-xs text-red-500 absolute -bottom-5'>
          Skill already exists
        </span>
      )}
    </div>
  );
}
