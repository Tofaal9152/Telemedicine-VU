import SignButtonAndProfile from "@/components/pages/auth/SignButton";
import CustomImage from "@/components/ui/Image";
// import ModeToggle from "@/components/ui/ModeToggle";
import Notification from "@/components/pages/notification/Notification";
import imagePath from "@/constants/imagePath";
import { NavbarNavItems } from "@/constants/navitems";
import { getSession } from "@/lib/session";
import Link from "next/link";
import BottomTabNavigation from "./BottomTabNavigation";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const session = await getSession();
  const NavItems = NavbarNavItems(session);

  return (
    <>
      <NavbarClient>
        <div className="container mx-auto flex items-center justify-between p-3">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10">
                <CustomImage
                  src={imagePath.logo}
                  alt="Telemedicine Logo"
                  width={40}
                  height={40}
                  className="rounded-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#007b8f] to-[#00c49a] bg-clip-text text-transparent">
                Telemedicine
              </span>
            </Link>
          </div>

          {/* Desktop Nav Items - Hidden on mobile */}
          <ul className="hidden lg:flex space-x-1">
            {NavItems.navmain.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#007b8f]/10 hover:to-[#00c49a]/10 transition-all duration-300 group"
                >
                  <span className="text-[#007b8f] group-hover:text-[#005a6b] transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span className="font-semibold text-[#00c49a] group-hover:text-[#009d7a] transition-colors duration-300">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* <ModeToggle /> */}
            {session?.user?.role === "PATIENT" && <Notification />}

            <SignButtonAndProfile />
          </div>
        </div>
      </NavbarClient>

      {/* Bottom Tab Navigation - Only on mobile */}
      <BottomTabNavigation navItems={NavItems.navmain} session={session} />
    </>
  );
};

export default Navbar;
