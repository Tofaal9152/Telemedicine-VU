import CallRoom from "@/components/pages/appointments/call/room/CallRoom";
import { RoomPageProps } from "@/types/dynamic-route";

const page = async ({ params }: RoomPageProps) => {
  const { room } = await params;
  return (
    <div>
      <CallRoom room={room} />
    </div>
  );
};

export default page;
