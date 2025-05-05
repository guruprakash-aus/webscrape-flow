import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { TaskType } from "@/types/task";
import React, { DragEvent, FC } from "react";

type Props = {
  taskType: TaskType;
};

const TaskMenuBtn: FC<Props> = ({ taskType }) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (e: DragEvent<HTMLButtonElement>, type: TaskType) => {
    e.dataTransfer.setData('application/reactflow', type);
    e.dataTransfer.effectAllowed = 'move';
  };
  return (
    <Button
      className="w-full gap-2 border flex justify-between items-center"
      draggable
      onDragStart={(e) => onDragStart(e, taskType)}
      variant="secondary"
    >
      <div className="flex items-center gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  )
};

export default TaskMenuBtn;
