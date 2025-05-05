import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position } from '@xyflow/react'
import React, { ReactNode } from 'react'
import COLOR_FOR_HANDLE from './common'

const NodeOutputs  = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col divide-y gap-1'>{children}</div>
  )
}

export const NodeOutput = ({output} : {output: TaskParam,nodeId: string}) => {
    return (
        <div className="relative flex justify-end bg-secondary p-3">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        className={cn(
          '!-right-2 !h-4 !w-4 !border-2 !border-background !bg-muted-foreground',
          COLOR_FOR_HANDLE[output.type]
        )}
        id={output.name}
        position={Position.Right}
        type="source"
      />
      </div>)
}
export default NodeOutputs