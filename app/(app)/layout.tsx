import AppSidebar from "@/components/shared/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { getWorkflows } from "@/lib/db/functions/workflows"
import { WorkflowProvider, type Workflow } from "@/components/shared/workflow-provider"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let workflows: Workflow[] = []
  try {
    workflows = (await getWorkflows()) as Workflow[]
  } catch {
    // User not authenticated or not in org
  }

  return (
    <WorkflowProvider initial={workflows}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </WorkflowProvider>
  )
}
