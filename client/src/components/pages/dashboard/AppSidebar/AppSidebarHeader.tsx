import AppImage from "@/components/ui/AppImage";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import imagePath from "@/constants/imagePath";
import Link from "next/link";

export function AppSidebarHeader({ session }: { session: any }) {
  const activeTeam = {
    name: "Telemedicin",
    logo: imagePath.logo,
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
          >
            <AppImage
              src={activeTeam.logo}
              width={35}
              height={35}
              alt="logo"
              className="rounded-md p-1 mr-2 "
            />
            <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
              <span className="truncate font-semibold">{activeTeam.name}</span>
              <span className="truncate text-xs mt-1">
                ({session?.user?.role || "ADMIN"})
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
