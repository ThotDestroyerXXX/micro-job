import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface SkillsHeaderProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function SkillsHeader({
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
}: Readonly<SkillsHeaderProps>) {
  return (
    <div className='flex items-center justify-between'>
      <h3 className='text-lg font-semibold'>Skills & Capabilities</h3>

      {isEditing ? (
        <div className='flex gap-2'>
          <Button
            size='sm'
            onClick={onSave}
            disabled={isSaving}
            className='h-8'
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            size='sm'
            variant='outline'
            onClick={onCancel}
            disabled={isSaving}
            className='h-8 bg-transparent'
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          size='sm'
          variant='ghost'
          onClick={onEdit}
          className='text-muted-foreground hover:text-foreground'
        >
          <Edit className='h-4 w-4 mr-2' />
          Edit
        </Button>
      )}
    </div>
  );
}
