"use client"

import Image from "next/image"
import { UserButton, useUser, OrganizationSwitcher } from "@clerk/nextjs"
import { WorkflowIcon } from "lucide-react"
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
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

export default function AppSidebar() {
  const { user } = useUser()
  const { state, openMobile, isMobile } = useSidebar()
  const isExpanded = state === "expanded" || (isMobile && openMobile)

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
          <SidebarGroupLabel>Workflows</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Workflows">
                  <WorkflowIcon />
                  <span>Workflows</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
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
