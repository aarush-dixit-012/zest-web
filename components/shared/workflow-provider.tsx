"use client"

import { createContext, useContext } from "react"
import {
  useWorkflows,
  type Workflow,
  type OptimisticWorkflow,
  type Message,
} from "@/hooks/use-workflows"

export type { Workflow }

type WorkflowContextType = {
  workflows: OptimisticWorkflow[]
  addOptimistic: (workflow: OptimisticWorkflow) => void
  deleteOptimistic: (id: string) => void
  isPending: boolean
}

const WorkflowContext = createContext<WorkflowContextType | null>(null)

export function useWorkflowContext() {
  const ctx = useContext(WorkflowContext)
  if (!ctx) throw new Error("useWorkflowContext must be used within WorkflowProvider")
  return ctx
}

export function WorkflowProvider({
  initial,
  children,
}: {
  initial: Workflow[]
  children: React.ReactNode
}) {
  const { workflows, addOptimistic, deleteOptimistic, isPending } = useWorkflows(initial)

  return (
    <WorkflowContext.Provider value={{ workflows, addOptimistic, deleteOptimistic, isPending }}>
      {children}
    </WorkflowContext.Provider>
  )
}
