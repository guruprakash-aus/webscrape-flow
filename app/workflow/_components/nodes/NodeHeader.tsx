import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import createFlowNode from "@/lib/workflow/createFlowNode";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import React from "react";

import type { FC } from "react";

type Props = {
  taskType: TaskType;
  nodeId: string;
};

const NodeHeader: FC<Props> = ({ taskType, nodeId }) => {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();

  return (
    <div className='flex items-center gap-2 p-2'>
      <task.icon size={16} />
      <div className='w-full flex justify-between items-center'>
        <p className='text-xs font-bold uppercase text-muted-foreground'>
          {task.label}
        </p>
        <div className='flex items-center gap-1'>
          {task.isEntryPoint && <Badge>Entry Point</Badge>}
          <Badge className='flex items-center gap-2 text-xs'>
            <CoinsIcon size={16} />
            TODO
          </Badge>
          {/* We do not want to delete or duplicate entry point */}
          {!task.isEntryPoint && (
            <>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  deleteElements({
                    nodes: [{ id: nodeId }],
                  });
                }}
              >
                <TrashIcon size={12} />
              </Button>
              <Button variant={"ghost"} size={"icon"} onClick={() => {
                const node = getNode(nodeId) as AppNode
                const newX = node.position.x;
                const newY = node.position.y + node.measured?.height! + 20;
                const newNode = createFlowNode(node.data.type, {
                  x: newX,
                  y: newY
                })
                addNodes([newNode])
              }}>
                <CopyIcon size={12} />
              </Button>
            </>
          )}
          <Button
            className='drag-handle cursor-grab'
            size='icon'
            variant='ghost'
          >
            <GripVerticalIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
