import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SelectForm from "@/components/select-form";
import { experienceLevel } from "@/db/schema";
import { UseFormReturn } from "react-hook-form";
import { JobFormData } from "../../config/job.config";

export default function SkillRequirementSection({
  form,
}: Readonly<{
  form: UseFormReturn<JobFormData>;
}>) {
  const handleAddSkillFromInput = () => {
    const input = document.getElementById("skill-input") as HTMLInputElement;
    const skill = input.value;
    const currentSkills = form.getValues("required_skills") || []; // Add safety check
    if (skill.trim() && !currentSkills.includes(skill.trim())) {
      form.setValue("required_skills", [...currentSkills, skill.trim()]);
      console.log("Updated skills:", form.getValues("required_skills")); // Debugging line
      input.value = ""; // Clear input after adding
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = form
      .getValues("required_skills")
      .filter((skill) => skill !== skillToRemove);
    form.setValue("required_skills", newSkills);
  };
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
              <span className='text-sm font-semibold text-green-600'>2</span>
            </div>
            Skills & Requirements
          </CardTitle>
          <CardDescription>
            Specify what skills and qualifications are needed
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label>Required Skills</Label>
            <div className='flex gap-2 h-full'>
              <Input
                placeholder='Add a skill...'
                id='skill-input'
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkillFromInput();
                  }
                }}
              />
              <Button type='button' onClick={handleAddSkillFromInput} size='lg'>
                <Plus className='h-4 w-4' />
              </Button>
            </div>
            <div className='flex flex-wrap gap-2 mt-2'>
              <FormField
                control={form.control}
                name='required_skills'
                render={({ field: { value } }) => (
                  <>
                    {value.map((skill) => (
                      <Badge
                        key={skill}
                        className='flex items-center gap-1 text-sm'
                      >
                        {skill}
                        <Button
                          type='button'
                          onClick={() => handleRemoveSkill(skill)}
                          className='ml-1 hover:text-destructive size-5'
                          variant='ghost'
                          size='sm'
                        >
                          <X className='h-3 w-3' />
                        </Button>
                      </Badge>
                    ))}
                  </>
                )}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='experience_level'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <SelectForm field={field} list={experienceLevel.enumValues} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='requirements'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Requirements</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Valid driver's license, 18+ years old"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
