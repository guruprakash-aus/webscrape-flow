"use server"

import prisma from '@/lib/prisma'
import createFlowNode from '@/lib/workflow/createFlowNode'
import { createWorkflowSchema, CreateWorkflowSchemaType } from '@/schema/workflow'
import { AppNode } from '@/types/appNode'
import { TaskType } from '@/types/task'
import { WorkflowStatus } from '@/types/workflow'
import { auth } from '@clerk/nextjs/server'
import { Edge } from '@xyflow/react'
import { redirect } from 'next/navigation'
import React from 'react'
import { z } from 'zod'

const createWorkflow = async (form: CreateWorkflowSchemaType) => {
    const { success, data } = createWorkflowSchema.safeParse(form);

    if (!success) {
        throw new Error('Invalid form data');
      }
    
    const { userId } = await auth();

    if (!userId) {
        throw new Error('Unauthorized');
      }
    
      const initialFlow: { nodes: AppNode[], edges: Edge[] } = {
        nodes: [],
        edges: []
      }

      // Lets add the flow entry point
      initialFlow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER))

      const createdWorkflow = await prisma.workflow.create({
        data: {
          userId,
          status: WorkflowStatus.DRAFT,
          definition: JSON.stringify(initialFlow),
          ...data
        }
      });
    
      if (!createdWorkflow) {
        throw new Error('Failed to create workflow');
      }

      redirect(`/workflow/editor/${createdWorkflow.id}`);
}

export default createWorkflow