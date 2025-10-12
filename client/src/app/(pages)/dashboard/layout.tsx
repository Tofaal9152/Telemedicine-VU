import { AppSidebar } from "@/components/pages/dashboard/AppSidebar/AppSidebar";
import SidebarNavbar from "@/components/pages/dashboard/AppSidebar/SidebarNavbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <SidebarProvider className="bg-white dark:bg-gray-900">
      <AppSidebar session={session} />
      <SidebarInset>
        {/* Navbar */}
        <SidebarNavbar />
        <section className="w-full h-full text-foreground transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
