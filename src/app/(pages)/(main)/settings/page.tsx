import ChangePassword from "@/components/pages/settings/ChangePassword";
import EditProfile from "@/components/pages/settings/EditProfile";
import { getSession } from "@/lib/session";

const page = async () => {
  const session = await getSession();
  return (
    <div className="pb-20 lg:pb-0">
      <div className="space-y-10">
        <div >
          <div className="text-center">
            <h2 className="text-2xl font-bold ">Edit Profile</h2>
            <p className="text-sm text-center ">
              Update your profile information. You can change your name, email,
              age, and gender.
            </p>
          </div>
        </div>
        <EditProfile role={session?.user?.role} />
        <div className="text-center">
          <h2 className="text-2xl font-bold ">Change Password</h2>
          <p className="text-sm  mb-4 ">
            Change your password to keep your account secure. Make sure to use a
            strong password that you haven&apos;t used before.
          </p>
        </div>
        <ChangePassword />
      </div>
    </div>
  );
};

export default page;
