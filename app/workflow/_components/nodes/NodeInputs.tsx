import { Handle, Position, useEdges } from "@xyflow/react";
import React, { ReactNode } from "react";
import COLOR_FOR_HANDLE from "./common";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import NodeParamField from "./NodeParamField";

export const NodeInputs = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col divide-y gap-2'>{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) => {
  const edges = useEdges();

  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  return (
    <div className='relative flex w-full justify-start bg-secondary p-3'>
      {/* <pre>{JSON.stringify(input, null, 4)}</pre> */}
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            COLOR_FOR_HANDLE[input.type]
          )}
          id={input.name}
          isConnectable={!isConnected}
          type='target'
          position={Position.Left}
        />
      )}
    </div>
  );
};
