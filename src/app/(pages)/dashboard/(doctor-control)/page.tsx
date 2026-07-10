import DoctorContent from "@/components/pages/dashboard/agentControl/DoctorContent";
import DoctorControlForm from "@/components/pages/dashboard/agentControl/DoctorControlForm";
import { Button } from "@/components/ui/button";
import { BadgeCheck, PlusCircle, Stethoscope } from "lucide-react";
import Link from "next/link";

const page = async () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-5">
        <div className=" mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40">
              <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Doctor Control
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage doctors — create, approve, or remove accounts
              </p>
            </div>
          </div>
          <Link href="https://verify.bmdc.org.bd/" target="_blank">
            <Button
              variant="destructive"
              size="sm"
              className="gap-2 animate-pulse"
            >
              <BadgeCheck className="w-4 h-4" />
              Verify BMDC Registration
            </Button>
          </Link>
        </div>
      </div>

      <div className=" mx-auto px-4 py-8 space-y-10">
        {/* Add Doctor section */}
        <section>
          <DoctorControlForm />
        </section>

        {/* Doctors list section */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Stethoscope className="w-4 h-4 text-blue-500" />
            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300">
              All Doctors
            </h2>
          </div>
          <DoctorContent />
        </section>
      </div>
    </div>
  );
};

export default page;
