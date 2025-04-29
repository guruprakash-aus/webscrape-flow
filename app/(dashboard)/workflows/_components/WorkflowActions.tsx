import type { FC } from 'react';
import { useState } from 'react';

import { MoreVerticalIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import ToolTipWrapper from '@/components/ToolTipWrapper';

import DeleteWorkflowDialog from './DeleteWorkflowDialog';

type Props = {
  workflowName: string;
  workflowId: string;
};

const WorkflowActions: FC<Props> = ({ workflowName, workflowId }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const ToggleDeleteDialog = () => {
    setIsDeleteDialogOpen((prev) => !prev);
  };

  return (
    <>
      <DeleteWorkflowDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        workflowId={workflowId}
        workflowName={workflowName}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            <ToolTipWrapper content="More actions" side="top">
              <div className="h-full w-full flex items-center justify-center">
                <MoreVerticalIcon size={18} />
              </div>
            </ToolTipWrapper>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 text-destructive"
            onSelect={ToggleDeleteDialog}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default WorkflowActions;
