"use client"

import { useOptimistic, useTransition } from "react"

export type Message = {
  role: "user" | "agent"
  content: string
}

export type Workflow = {
  id: string
  name: string
  orgId: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export type OptimisticWorkflow = Workflow & { _optimistic?: true }

type OptimisticAction =
  | { type: "add"; workflow: OptimisticWorkflow }
  | { type: "delete"; id: string }

export function useWorkflows(initial: Workflow[]) {
  const [workflows, dispatchOptimistic] = useOptimistic(
    initial,
    (
      state: OptimisticWorkflow[],
      action: OptimisticAction
    ) => {
      if (action.type === "add") {
        return [...state, { ...action.workflow, _optimistic: true }]
      }
      if (action.type === "delete") {
        return state.filter((w) => w.id !== action.id)
      }
      return state
    }
  )
  const [isPending, startTransition] = useTransition()

  const addOptimistic = (workflow: OptimisticWorkflow) => {
    startTransition(() => {
      dispatchOptimistic({ type: "add", workflow })
    })
  }

  const deleteOptimistic = (id: string) => {
    startTransition(() => {
      dispatchOptimistic({ type: "delete", id })
    })
  }

  return { workflows, addOptimistic, deleteOptimistic, isPending, startTransition }
}
