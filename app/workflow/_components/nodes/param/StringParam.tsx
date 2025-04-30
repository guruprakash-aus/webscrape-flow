"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/types/task";
import React, { FC, useId, useState } from "react";

type Props = {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
};

const StringParam: FC<Props> = ({ param, value, updateNodeParamValue }) => {
  const [internalValue, setInternalValue] = useState<string>(value);
  const id = useId();
  return (
    <div className='w-full space-y-1 p-1'>
      <Label className='flex text-xs' htmlFor={id}>
        {param.name}
        {param.required && <span className='text-red-400 px-2'>*</span>}
      </Label>
      <Input
        id={id}
        className='text-xs'
        value={internalValue}
        placeholder='Enter value here'
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
      />

      {param.helperText && (
        <p className='px-2 text-xs text-muted-foreground'>{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
