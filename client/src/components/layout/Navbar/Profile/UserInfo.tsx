import Aavtar from "./Aavtar";

const UserInfo = ({ className, session }: any) => {
  return (
    <div className="flex px-4 py-2 items-center gap-3  pb-3 ">
      <Aavtar className={className} />
      <div>
        <p className="text-sm font-semibold ">
          {session?.user?.name || session?.user?.role}
        </p>
        <p className="text-xs dark:text-slate-300">
          {session?.user.email || "student@example.com"}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
