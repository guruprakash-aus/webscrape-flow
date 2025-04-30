import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { TaskType } from "@/types/task";
import { CoinsIcon, GripVerticalIcon } from "lucide-react";
import React from "react";

import type { FC } from "react";

type Props = {
  taskType: TaskType;
};

const NodeHeader: FC<Props> = ({ taskType }) => {
  const task = TaskRegistry[taskType];
  return (
    <div className='flex items-center gap-2 p-2'>
      <task.icon size={16} />
      <div className='w-full flex justify-between items-center'>
        <p className='text-xs font-bold uppercase text-muted-foreground'>
          {task.label}
        </p>
        <div className='flex items-center gap-1'>
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className="flex items-center gap-2 text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>
          <Button className="drag-handle cursor-grab" size="icon" variant="ghost">
            <GripVerticalIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
