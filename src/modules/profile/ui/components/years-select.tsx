import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function YearsSelect({
  skill,
  handleUpdateSkillYears,
}: Readonly<{
  skill: { name: string; years: number };
  handleUpdateSkillYears: (skillName: string, years: number) => void;
}>) {
  return (
    <Select
      value={skill.years.toString()}
      onValueChange={(value) =>
        handleUpdateSkillYears(skill.name, parseInt(value, 10))
      }
    >
      <SelectTrigger
        className='w-20 border-0 bg-transparent focus:ring-0'
        size='sm'
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}y
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
