import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSession } from "@/lib/session";
import { User } from "lucide-react";
import UserButtonPopover from "./UserButtonPopover";

const Profile = async () => {
  const session = await getSession();
  if (!session) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="border-[#007b8f] text-[#007b8f] hover:bg-[#007b8f] hover:text-white bg-transparent"
      >
        <User size={16} className="mr-2" />
        Profile
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-[#007b8f] text-[#007b8f] hover:bg-[#007b8f] hover:text-white bg-transparent"
        >
          <div>
            <User size={16} className="mr-2" />
            Profile
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" dark:bg-slate-950">
        <UserButtonPopover session={session} />
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
