"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton, useUser, OrganizationSwitcher } from "@clerk/nextjs"
import { WorkflowIcon, LayoutDashboardIcon, Trash2Icon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { useWorkflowContext } from "@/components/shared/workflow-provider"
import { toast } from "@/components/ui/toast"
import { deleteWorkflow } from "@/lib/db/functions/workflows"

export default function AppSidebar() {
  const { user } = useUser()
  const { state, openMobile, isMobile } = useSidebar()
  const pathname = usePathname()
  const { workflows, deleteOptimistic } = useWorkflowContext()
  const isExpanded = state === "expanded" || (isMobile && openMobile)

  async function handleDelete(id: string) {
    deleteOptimistic(id)
    try {
      await deleteWorkflow(id)
      toast.add({ type: "success", title: "Workflow deleted" })
      if (pathname === `/workflows/${id}`) {
        window.location.href = "/"
      }
    } catch {
      toast.add({ type: "error", title: "Failed to delete workflow" })
    }
  }

  const workflowList = (
    <SidebarMenu>
      {workflows.map((workflow) => (
        <SidebarMenuItem key={workflow.id}>
          <SidebarMenuButton
            tooltip={workflow.name}
            isActive={pathname === `/workflows/${workflow.id}`}
            render={<Link href={`/workflows/${workflow.id}`} />}
          >
            <WorkflowIcon className={workflow._optimistic ? "animate-pulse opacity-50" : ""} />
            <span className={`truncate ${workflow._optimistic ? "opacity-50" : ""}`}>{workflow.name}</span>
          </SidebarMenuButton>
          <SidebarMenuAction showOnHover>
            <Trash2Icon
              className="size-4 text-muted-foreground hover:text-destructive"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleDelete(workflow.id)
              }}
            />
          </SidebarMenuAction>
        </SidebarMenuItem>
      ))}
      {workflows.length === 0 && (
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="No workflows yet" disabled>
            <WorkflowIcon />
            <span className="truncate text-muted-foreground">No workflows yet</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  )

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex size-8 items-center justify-center rounded-lg p-0">
              <Image src="/icon.svg" alt="Zest" width={32} height={32} draggable={false} />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        {isExpanded && (
          <SidebarMenu>
            <SidebarMenuItem>
              <OrganizationSwitcher
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "w-full",
                  },
                }}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  isActive={pathname === "/"}
                  render={<Link href="/" />}
                >
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Workflows</SidebarGroupLabel>
          <SidebarGroupContent>
            {isExpanded ? (
              workflowList
            ) : (
              <Popover>
                <PopoverTrigger className="flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent">
                  <WorkflowIcon className="size-4" />
                </PopoverTrigger>
                <PopoverContent side="right" sideOffset={8} align="start">
                  <div className="text-sm font-medium mb-2">Workflows</div>
                  {workflows.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No workflows yet</p>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {workflows.map((workflow) => (
                        <div
                          key={workflow.id}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent text-left"
                        >
                          <Link
                            href={`/workflows/${workflow.id}`}
                            className={`flex-1 flex items-center gap-2 truncate ${pathname === `/workflows/${workflow.id}` ? "bg-accent" : ""}`}
                          >
                            <WorkflowIcon className="size-4 shrink-0" />
                            <span className="truncate">{workflow.name}</span>
                          </Link>
<Trash2Icon
                              className="size-4 text-muted-foreground hover:text-destructive cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleDelete(workflow.id)
                              }}
                            />
                        </div>
                      ))}
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={user?.firstName ?? "Account"}>
              <UserButton />
              {isExpanded && (
                <span className="truncate">{user?.firstName}</span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
