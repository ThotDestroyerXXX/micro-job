"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SkillsHeader } from "../components/skills-header";
import { AddSkillForm } from "../components/add-skill-form";
import { SkillsGrid } from "../components/skills-grid";
import { useSkillsManagement } from "../../hooks/use-profile-hook";

interface Skill {
  name: string;
  years: number;
}

interface SkillSectionProps {
  profileData: Skill[];
  userId: string;
}

export default function SkillSection({
  profileData,
  userId,
}: Readonly<SkillSectionProps>) {
  const {
    isEditing,
    editSkills,
    newSkill,
    isSaving,
    handleEdit,
    handleCancel,
    handleSave,
    handleAddSkill,
    handleRemoveSkill,
    handleUpdateSkillYears,
    handleNewSkillChange,
  } = useSkillsManagement({
    initialSkills: profileData,
  });

  const displaySkills = isEditing ? editSkills : profileData;

  return (
    <Card>
      <CardHeader>
        <SkillsHeader
          isEditing={isEditing}
          isSaving={isSaving}
          onEdit={handleEdit}
          onSave={() => handleSave(userId)}
          onCancel={handleCancel}
        />
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div>
            {isEditing && (
              <div className='mb-4'>
                <h4 className='font-medium text-sm text-muted-foreground mb-4'>
                  MANAGE SKILLS
                </h4>
                <div className='space-y-4'>
                  <AddSkillForm
                    newSkill={newSkill}
                    onSkillChange={handleNewSkillChange}
                    onAddSkill={handleAddSkill}
                    existingSkills={editSkills}
                  />
                  <SkillsGrid
                    skills={displaySkills}
                    isEditing={isEditing}
                    onRemoveSkill={handleRemoveSkill}
                    onUpdateSkillYears={handleUpdateSkillYears}
                  />
                </div>
              </div>
            )}

            {!isEditing && <SkillsGrid skills={displaySkills} />}
          </div>

          <Separator />

          <div>
            <h4 className='font-medium text-sm text-muted-foreground mb-3'>
              EXPERIENCE LEVEL
            </h4>
            <Badge
              variant='outline'
              className='bg-blue-50 text-blue-700 border-blue-200'
            >
              {getExperienceLevel(profileData)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to calculate experience level
function getExperienceLevel(skills: Skill[]): string {
  if (skills.length === 0) return "Beginner";

  const avgYears =
    skills.reduce((sum, skill) => sum + skill.years, 0) / skills.length;

  if (avgYears >= 5) return "Expert";
  if (avgYears >= 3) return "Advanced";
  if (avgYears >= 1) return "Intermediate";
  return "Beginner";
}
