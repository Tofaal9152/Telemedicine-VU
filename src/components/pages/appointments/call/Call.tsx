"use client";

import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

const Call = ({ data, session }: { data: any; session: any }) => {
  const router = useRouter();

  const room = `room-call-${data?.doctorId}-${data?.patientId}`;

  const handleJoinRoom = useCallback(() => {
    if (!data?.doctorId || !data?.patientId || !session?.user?.email) {
      console.log("Invalid data for joining call room.");
      toast.error("Invalid data for joining call room.");
      return;
    }

    router.push(`/appointments/call/${room}`);
  }, [router, room, data, session]);

  return (
    <div
      style={{ height: "80vh", borderRadius: "12px", overflow: "hidden" }}
      className="flex items-center justify-center    border-4 border-dashed border-gray-300"
    >
      <Button onClick={handleJoinRoom} variant={"destructive"} size={"lg"}>
        <Video /> Join Video Call
      </Button>
    </div>
  );
};

export default Call;
