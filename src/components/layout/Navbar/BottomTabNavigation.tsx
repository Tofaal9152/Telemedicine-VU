"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

interface BottomTabNavigationProps {
  navItems: NavItem[];
  session: any;
}

const BottomTabNavigation = ({ navItems }: BottomTabNavigationProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Bottom Tab Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        {/* Background with blur effect */}
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-around h-16">
            {/* Main Navigation Items */}
            {navItems.slice(0, 5).map((item, index) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`flex flex-1 flex-col items-center justify-center space-y-1 transition-all duration-300 relative group ${
                    isActive
                      ? "text-[#007b8f] dark:text-[#00c49a]"
                      : "text-gray-500 dark:text-gray-400 hover:text-[#007b8f] dark:hover:text-[#00c49a]"
                  }`}
                >
                  {/* Icon with animation */}
                  <div
                    className={`transition-all duration-300 ${
                      isActive
                        ? "scale-110 animate-bounce-subtle"
                        : "group-hover:scale-105"
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      isActive ? "font-semibold" : ""
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Ripple effect on tap */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#007b8f]/10 to-[#00c49a]/10 scale-0 group-active:scale-100 transition-transform duration-200 rounded-lg" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Safe area for devices with home indicator */}
        <div className="h-safe-area-inset-bottom bg-white/95 dark:bg-gray-900/95" />
      </div>

      {/* Spacer to prevent content from being hidden behind bottom nav */}
      <div className="h-16 lg:hidden" />

      <style jsx>{`
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 0.6s ease-in-out;
        }

        .h-safe-area-inset-bottom {
          height: env(safe-area-inset-bottom);
        }
      `}</style>
    </>
  );
};

export default BottomTabNavigation;
