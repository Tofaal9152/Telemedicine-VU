import Profile from "@/components/layout/Navbar/Profile/Profile";
// import ModeToggle from "@/components/ui/ModeToggle";

import { SidebarTrigger } from "@/components/ui/sidebar";

const SidebarNavbar = () => {
  return (
    <header className="flex h-14 items-center justify-between px-4 border-b sticky top-0 z-10 bg-white dark:bg-gray-950 ">
      {/* Left side: Sidebar + Breadcrumb */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center gap-4">
        {/* <ModeToggle /> */}
        {/* Profile icon */}

        <Profile />
      </div>
    </header>
  );
};

export default SidebarNavbar;
