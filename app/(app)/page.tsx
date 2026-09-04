"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ChatComposer from "@/components/shared/chat-composer"
import Image from "next/image"
import { createWorkflow } from "@/lib/db/functions/workflows"
import { useWorkflowContext } from "@/components/shared/workflow-provider"
import { toast } from "@/components/ui/toast"

const suggestions = [
  "Configure Porsche 911",
  "Play Chess",
]

export default function Page() {
  const [value, setValue] = useState("")
  const router = useRouter()
  const { addOptimistic } = useWorkflowContext()

  async function handleSubmit() {
    if (!value.trim()) return

    const id = crypto.randomUUID()
    const now = new Date()

    addOptimistic({
      id,
      name: value.trim(),
      orgId: "",
      messages: [],
      createdAt: now,
      updatedAt: now,
    })
    setValue("")

    try {
      const workflow = await createWorkflow({ name: value.trim() })
      router.refresh()
      window.location.href = `/workflows/${workflow.id}`
    } catch {
      toast.add({ type: "error", title: "Failed to create workflow" })
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-[90vh]">
      <Image src="/icon.svg" alt="Zest" width={48} height={48} />
      <h1 className="text-xl md:text-3xl font-bold">What would you like to do?</h1>
      <p className="text-sm md:text-base font-light text-muted-foreground">If a human can do it in browser, zest can automate it.</p>
      <div className="w-full px-4 md:px-0 md:w-[60vw]">
        <ChatComposer value={value} onChange={setValue} onSubmit={handleSubmit} />
        <div className="hidden md:flex justify-center gap-2 mt-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setValue(suggestion)}
              className="px-4 py-2 rounded-lg border text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
