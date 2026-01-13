"use client"

import {
  BookOpen,
  Bot,
  CreditCardIcon,
  FolderCog2Icon,
  FolderIcon,
  HistoryIcon,
  KeyIcon,
  Settings2,
  SquareTerminal,
  StarIcon
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/server/better-auth/client"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Workflows",
          url: "#",
          icon: FolderCog2Icon,
        },
        {
          title: "Credentials",
          url: "#",
          icon: KeyIcon,
        },
        {
          title: "Executions",
          url: "#",
          icon: HistoryIcon,
        },
      ],
    },

  ],
  navSecondary: [
    {
      title: "Upgrade to Pro",
      url: "#",
      icon: StarIcon,
    },
    {
      title: "Billing & Plans",
      url: "#",
      icon: CreditCardIcon,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession()

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image src={"/images/logo.png"} width={24} height={24} alt="Logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user?.name ?? "User",
            email: session?.user?.email ?? "user@example.com",
            avatar: session?.user?.image ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
