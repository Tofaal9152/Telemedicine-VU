import PaymentsContent from "@/components/pages/payments/PaymentsContent";
import { getSession } from "@/lib/session";

const page = async() => {
    const session = await getSession();
  return (
    <div>
      <PaymentsContent session={session} />
    </div>
  );
};

export default page;
