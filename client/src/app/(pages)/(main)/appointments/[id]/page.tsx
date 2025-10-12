import AppointmentsPage from "@/components/pages/appointments/AppointmentsPage";
import { getSession } from "@/lib/session";
import { PageProps } from "@/types/dynamic-route";

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const session: any = await getSession();
  const isDoctor = session?.user?.role === "DOCTOR";

  return (
    <AppointmentsPage
      session={session}
      appointmentId={id}
      isDoctor={isDoctor}
    />
  );
};

export default page;
