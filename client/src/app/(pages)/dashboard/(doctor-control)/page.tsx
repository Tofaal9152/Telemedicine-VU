import DoctorContent from "@/components/pages/dashboard/agentControl/DoctorContent";
import DoctorControlForm from "@/components/pages/dashboard/agentControl/DoctorControlForm";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const page = async () => {
  return (
    <div>
      <div className="p-6 InterFont">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between space-x-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold InterFont">Doctor Control</h2>
            <p className="text-sm text-muted-foreground InterFont">
              Manage and control doctors in your system. You can create, update,
              and delete doctors as needed.
            </p>
          </div>
          <Link href="https://verify.bmdc.org.bd/" target="_blank" className="animate-pulse">
            <Button variant={"destructive"}>
              <Check /> Verify BMDC Registration
            </Button>
          </Link>
        </div>
        <DoctorControlForm />

        <div className="mt-8">
          <h2 className="text-2xl font-bold InterFont">All Doctors</h2>
          <p className="text-sm text-muted-foreground mb-4 InterFont">
            Here you can view and manage all doctors in your system. You can
          </p>
        </div>
        <DoctorContent />
      </div>
    </div>
  );
};

export default page;
