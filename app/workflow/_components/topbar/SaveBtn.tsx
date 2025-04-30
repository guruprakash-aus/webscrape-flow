"use client";

import React, { FC } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import updateWorkflow from "@/actions/workflows/updateWorkflow";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  workflowId: string;
};

const SaveBtn: FC<Props> = ({ workflowId }) => {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", { id: "save-workflow" });
    },
    onError: () => {
      toast.error("Something went wrong", { id: "save-workflow" });
    },
  });

  return (
    <Button
      className='FLEX items-center gap-2'
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow...", { id: "save-workflow" });
        saveMutation.mutate({ workflowId, definition: workflowDefinition });
      }}
      variant='outline'
    >
      <CheckIcon className='stroke-green-400' size={16} />
      Save
    </Button>
  );
};

export default SaveBtn;
