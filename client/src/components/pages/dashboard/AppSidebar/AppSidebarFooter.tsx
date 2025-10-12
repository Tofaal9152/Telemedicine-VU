import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
export function AppSidebarFooter({ state }: { state: string }) {

  const user = {
    name: "VisionDesk AI",
    email: "t",
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-3">
        {/* <Profile /> */}
        {state === "expanded" && (
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {user?.name || "VisionDesk AI"}{" "}
            </span>
            <p className="text-xs hover:underline">
              {user?.email || "visionDeskaI@gmail.com"}{" "}
            </p>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
