import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DROPDOWN_ACTIONS } from "../../../constants/job-card-constants";

interface JobActionsDropdownProps {
  jobId: string;
  onAction?: (jobId: string, action: string) => void;
}

export default function JobActionsDropdown({
  jobId,
  onAction,
}: JobActionsDropdownProps) {
  const handleAction = (actionId: string) => {
    onAction?.(jobId, actionId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='link' size='sm' className='p-2'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {DROPDOWN_ACTIONS.map((action, index) => (
          <div key={action.id}>
            {action.separator && index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={() => handleAction(action.id)}
              className={action.className}
            >
              <action.icon className='h-4 w-4 mr-2' />
              {action.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
