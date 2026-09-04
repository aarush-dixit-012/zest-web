import { getWorkflow } from "@/lib/db/functions/workflows"
import WorkflowChat from "@/components/shared/workflow-chat"
import { notFound } from "next/navigation"
import type { Message } from "@/hooks/use-workflows"

export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let workflow: Awaited<ReturnType<typeof getWorkflow>> | null = null
  try {
    workflow = await getWorkflow(id)
  } catch {
    notFound()
  }

  const messages = (workflow?.messages as Message[]) ?? []

  return (
    <div className="flex flex-col h-full">
      <WorkflowChat initialMessages={messages} workflowName={workflow?.name ?? "Workflow"} />
    </div>
  )
}
