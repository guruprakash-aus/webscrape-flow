import { Input } from "@/components/ui/input";
import { TaskParam, TaskParamType } from "@/types/task";
import React, { FC, useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNode";
import BrowserInstanceParam from "./param/BrowserInstance";

type Props = {
  nodeId: string;
  param: TaskParam;
  disabled: boolean;
};

const NodeParamField: FC<Props> = ({ nodeId, param, disabled }) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data?.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [node?.data.inputs, nodeId, param.name, updateNodeData]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return <BrowserInstanceParam param={param} value={""} updateNodeParamValue={updateNodeParamValue} />;
    default:
      return (
        <div className='w-full'>
          <p className='text-xs text-muted-foreground'>Not Implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
