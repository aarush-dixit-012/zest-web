import { task } from "@trigger.dev/sdk"

export const exampleTask = task({
  id: "example-task",
  run: async (payload: { message: string }) => {
    console.log("Received payload:", payload)

    return {
      message: payload.message,
      timestamp: new Date().toISOString(),
    }
  },
})
