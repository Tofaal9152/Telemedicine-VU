import SignButton from "@/components/pages/auth/SignButton";
import ModeToggle from "@/components/ui/ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import type React from "react";

const MobileNavbar = ({
  navItems,
}: {
  navItems: { name: string; link: string; icon?: React.ReactNode }[];
}) => {
  return (
    <Sheet>
      {/* Hamburger Icon Trigger */}
      <SheetTrigger
        aria-label="Open menu"
        className="md:hidden block cursor-pointer p-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 transition-all duration-300 transform hover:scale-110"
      >
        <Menu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      </SheetTrigger>

      {/* Slide-Down Menu Content */}
      <SheetContent
        side="left"
        className="w-80 p-0 border-0  bg-gradient-to-b from-[#4f3d80] to-[#E6FFF5]"
      >
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="p-6 bg-white/10 backdrop-blur-sm border-b border-white/20">
            <SheetHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <SheetTitle className="text-2xl font-bold text-white">
                  Up&Pro
                </SheetTitle>
              </div>
              <SheetDescription className="text-white/80 text-sm">
                Navigate through your English learning journey
              </SheetDescription>
            </SheetHeader>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-6">
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <SheetTrigger asChild>
                    <Link
                      href={item.link}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 group"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <span className="font-semibold text-lg">{item.name}</span>
                    </Link>
                  </SheetTrigger>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Actions */}
          <div className="p-6 bg-white/10 backdrop-blur-sm border-t border-white/20">
            <div className="flex items-center justify-between gap-4">
              <ModeToggle />

              <SignButton />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
