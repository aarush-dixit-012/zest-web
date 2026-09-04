"use client"

import { useState } from "react"
import ChatComposer from "@/components/shared/chat-composer"
import {
  BubbleGroup,
  Bubble,
  BubbleContent,
} from "@/components/ui/bubble"
import { Message } from "@/hooks/use-workflows"

interface WorkflowChatProps {
  initialMessages: Message[]
  workflowName: string
}

export default function WorkflowChat({ initialMessages, workflowName }: WorkflowChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [value, setValue] = useState("")

  function handleSubmit() {
    if (!value.trim()) return

    const userMessage: Message = { role: "user", content: value.trim() }
    setMessages((prev) => [...prev, userMessage])
    setValue("")

    const agentMessage: Message = {
      role: "agent",
      content: `Processing: ${value.trim()}`,
    }
    setTimeout(() => {
      setMessages((prev) => [...prev, agentMessage])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-background border-b p-4">
        <h1 className="text-xl font-bold">{workflowName}</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center mt-8">
            No messages yet. Start a conversation.
          </p>
        ) : (
          <BubbleGroup className="flex-col gap-3">
            {messages.map((msg, i) => (
              <Bubble
                key={i}
                align={msg.role === "user" ? "end" : "start"}
                variant={msg.role === "user" ? "default" : "secondary"}
              >
                <BubbleContent>{msg.content}</BubbleContent>
              </Bubble>
            ))}
          </BubbleGroup>
        )}
      </div>
      <div className="mb-4 p-4">
        <ChatComposer value={value} onChange={setValue} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
