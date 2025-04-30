"use client"

import ToolTipWrapper from "@/components/ToolTipWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import SaveBtn from "./SaveBtn";

type Props = {
  title: string;
  subtitle?: string;
  workflowId: string;
};

const Topbar: FC<Props> = ({ subtitle, title, workflowId }) => {
  const router = useRouter();
  return (
    <header className='sticky top-0 z-10 h-[60px] w-full border-separate border-b-2 bg-background p-2 justify-between'>
      <div className='flex flex-1 items-center gap-1'>
        <ToolTipWrapper content='Back'>
          <Button onClick={() => router.back()} variant='ghost'>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
        </ToolTipWrapper>

        <div>
          <p className='truncate text-ellipsis font-bold'>{title}</p>
          {subtitle && (
            <p className='truncate text-ellipsis text-xs text-muted-foreground'>
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-1 justify-end gap-1">
            <SaveBtn workflowId={workflowId}/>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
