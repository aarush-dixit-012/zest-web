"use server";

import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { db } from "..";
import { workflows } from "../schema";

const createWorkflowSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
});

const updateWorkflowSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255).optional(),
  messages: z.array(z.any()).optional(),
});

export async function createWorkflow(input: z.infer<typeof createWorkflowSchema>) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) throw new Error("Unauthorized");

  const parsed = createWorkflowSchema.parse(input);

  const [workflow] = await db
    .insert(workflows)
    .values({ ...parsed, orgId })
    .returning();

  return workflow;
}

export async function getWorkflows() {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) throw new Error("Unauthorized");

  return db.query.workflows.findMany({
    where: eq(workflows.orgId, orgId),
    orderBy: (workflows, { desc }) => [desc(workflows.createdAt)],
  });
}

export async function getWorkflow(id: string) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) throw new Error("Unauthorized");

  z.string().uuid().parse(id);

  const workflow = await db.query.workflows.findFirst({
    where: and(eq(workflows.id, id), eq(workflows.orgId, orgId)),
  });

  if (!workflow) throw new Error("Workflow not found");

  return workflow;
}

export async function updateWorkflow(input: z.infer<typeof updateWorkflowSchema>) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) throw new Error("Unauthorized");

  const parsed = updateWorkflowSchema.parse(input);

  const [workflow] = await db
    .update(workflows)
    .set({ ...parsed, updatedAt: new Date() })
    .where(and(eq(workflows.id, parsed.id), eq(workflows.orgId, orgId)))
    .returning();

  if (!workflow) throw new Error("Workflow not found");

  return workflow;
}

export async function deleteWorkflow(id: string) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) throw new Error("Unauthorized");

  z.string().uuid().parse(id);

  const [workflow] = await db
    .delete(workflows)
    .where(and(eq(workflows.id, id), eq(workflows.orgId, orgId)))
    .returning();

  if (!workflow) throw new Error("Workflow not found");

  return workflow;
}
