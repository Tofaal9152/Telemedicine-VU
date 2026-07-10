import CallRoom from "@/components/pages/appointments/call/room/CallRoom";
import { getSession } from "@/lib/session";
import { RoomPageProps } from "@/types/dynamic-route";

const page = async ({ params }: RoomPageProps) => {
  const { room } = await params;
  const session = await getSession();

  return (
    <div>
      <CallRoom room={room} session={session} />
    </div>
  );
};

export default page;
