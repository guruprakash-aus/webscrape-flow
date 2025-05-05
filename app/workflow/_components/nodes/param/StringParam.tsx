"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import React, { FC, useEffect, useId, useState } from "react";


const StringParam: FC<ParamProps> = ({ param, value, updateNodeParamValue, disabled }) => {
  const [internalValue, setInternalValue] = useState<string>(value);
  const id = useId();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const Component = param.variant === 'textarea' ? Textarea : Input;

  return (
    <div className='w-full space-y-1 p-1'>
      <Label className='flex text-xs' htmlFor={id}>
        {param.name}
        {param.required && <span className='text-red-400 px-2'>*</span>}
      </Label>
      <Component
        id={id}
        className='text-xs'
        value={internalValue}
        placeholder='Enter value here'
        onChange={(e: any) => setInternalValue(e.target.value)}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
        disabled={disabled}
      />

      {param.helperText && (
        <p className='px-2 text-xs text-muted-foreground'>{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
