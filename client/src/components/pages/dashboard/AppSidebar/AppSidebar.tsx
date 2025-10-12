"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SingleItemAnalytics } from "@/constants/navitems";
import { AppSidebarHeader } from "./AppSidebarHeader";
import SingleComponentsidebar from "./SingleComponentsidebar";

export function AppSidebar({ session, ...props }: any) {
  const { setOpenMobile, openMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}> 
      {/* Header */}
      <SidebarHeader>
        <AppSidebarHeader session={session} />
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard for admin and student */}
        <SingleComponentsidebar
          title={"Dashboard"}
          openMobile={openMobile}
          setOpenMobile={setOpenMobile}
          items={SingleItemAnalytics.item}
        />
      </SidebarContent>

      {/* for mobile view */}
      <SidebarRail />
    </Sidebar>
  );
}
