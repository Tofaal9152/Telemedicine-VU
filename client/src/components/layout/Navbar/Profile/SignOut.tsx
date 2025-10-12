"use client";

import axios from "axios";
import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignOut = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/auth/signout`);
      console.log(res);
      if (res?.data.success) {
        router.replace("/");
        router.refresh();
        
      } else {
        console.error("Signout failed:", res?.data.message);
      }
    } catch (err) {
      console.log("Error during signout:", err);
      console.error("Signout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="text-red-500 text-xs font-semibold flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <Loader className="animate-spin w-4 h-4" />
      ) : (
        <LogOut size={16} />
      )}
      Sign Out
    </button>
  );
};

export default SignOut;
