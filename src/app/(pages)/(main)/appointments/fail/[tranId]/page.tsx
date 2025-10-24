import { Button } from "@/components/ui/button";
import Link from "next/link";

type tranIdProps = {
  params: Promise<{
    tranId: string;
  }>;
};
const page = async ({ params }: tranIdProps) => {
  const { tranId } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-10">
        Appointment Failled
      </h1>
      <p className="text-center mt-4">
        Your appointment with transaction ID{" "}
        <span className="font-semibold">{tranId}</span> has failed.
      </p>

      <Link
        href="/"
        className="block text-center mt-6 text-blue-500 hover:underline"
      >
        <Button>Go back to Appointments</Button>
      </Link>
    </div>
  );
};

export default page;
