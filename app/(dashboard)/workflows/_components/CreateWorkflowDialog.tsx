"use client";
import React, { useCallback, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layers2Icon, Loader2 } from "lucide-react";
import { z } from "zod";
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from "@/schema/workflow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import createWorkflow from "@/actions/workflows/createWorkflow";

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);
  // const [isPending, setIsPending] = useState(false)

  const form = useForm<CreateWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      toast.success("Workflow created successfully", { id: "create-workflow" });
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create workflow",
        {
          id: "create-workflow",
        }
      );
    },
  });

  const handleSubmit = useCallback(
    (values: CreateWorkflowSchemaType) => {
      toast.loading("Creating workflow...", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader
          icon={Layers2Icon}
          title='Create Workflow'
          subtitle='Start building your workflow'
        />
        <div className='p-6'>
          <Form {...form}>
            <form
              className='w-full space-y-8'
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='gap-1 flex-between'>
                      <p>Name</p>

                      <FormMessage />
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='gap-1 flex-between'>
                      <p>Description</p>

                      <FormMessage />
                    </FormLabel>

                    <FormControl>
                      <Textarea className='resize-none' {...field} />
                    </FormControl>

                    <FormDescription>
                      Provide a brief description of what your workflow does.{" "}
                      <br /> This is optional but can help you remember the
                      workflow&apos;s purpose.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button className='w-full' disabled={isPending} type='submit'>
                {!isPending && "Proceed"}
                {isPending && <Loader2 className='h-4 w-4 animate-spin' />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
