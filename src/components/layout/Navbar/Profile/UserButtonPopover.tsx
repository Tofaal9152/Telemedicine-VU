import SignOut from "./SignOut";
import UserInfo from "./UserInfo";

const UserButtonPopover = ({ session }: any) => {
  return (
    <div className="flex  text-slate-800 dark:text-slate-200 flex-col">
      {/* User Info */}
      <UserInfo session={session} className="w-12 h-12" />

      {/* Sign Out */}

      <div className="border-b my-0.5"></div>
      <SignOut />
    </div>
  );
};
export default UserButtonPopover;
