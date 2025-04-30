'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@clerk/nextjs/server';

import { WorkflowStatus } from '@/types/workflow';

import prisma from '@/lib/prisma';

const updateWorkflow = async ({
  workflowId,
  definition
}: {
  workflowId: string;
  definition: string;
}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId
    }
  });

  if (!workflow) {
    throw new Error('Workflow not found');
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error('Workflow is not in draft status');
  }

  await prisma.workflow.update({
    where: {
      id: workflowId,
      userId
    },
    data: {
      definition
    }
  });

  revalidatePath('/workflows');
};

export default updateWorkflow;
