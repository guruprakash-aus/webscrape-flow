'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';


const getWorkflowsForUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const userWorkflows = await prisma.workflow.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return userWorkflows ?? [];
// return null
};

export default getWorkflowsForUser;
