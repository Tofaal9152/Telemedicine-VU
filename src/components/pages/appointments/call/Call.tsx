"use client";

import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

const Call = ({ data, session }: { data: any; session: any }) => {
  const router = useRouter();
  const socket = useSocket();

  const room = `room-call-${data?.doctorId}-${data?.patientId}`;

  const handleJoinRoom = useCallback(() => {
    if (!socket || !data?.doctorId || !data?.patientId) {
      console.log("Invalid data for joining call room.");
      toast.error("Invalid data for joining call room.");
      return;
    }

    socket.emit("join-room", {
      room,
      name: session?.user?.name ?? "Anonymous",
      role: session?.user?.role ?? "guest",
      email: session?.user?.email ?? "unknown@example.com",
    });
  }, [socket, room, data, session]);

  const handleJoinedRoom = useCallback(
    (data: { message: string }) => {
      console.log(data?.message);
      router.push(`/appointments/call/${room}`);
    },
    [router, room]
  );

  useEffect(() => {
    socket.on("joined-room", handleJoinedRoom);
    return () => {
      socket.off("joined-room", handleJoinedRoom);
    };
  }, [socket, handleJoinedRoom]);
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
