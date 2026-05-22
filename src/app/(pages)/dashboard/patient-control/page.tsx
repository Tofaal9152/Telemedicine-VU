import StudentContent from "@/components/pages/dashboard/studentControl/StudentContent";
import { Users } from "lucide-react";

const page = async () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-5">
        <div className=" mx-auto flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-100 dark:bg-violet-900/40">
            <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Patient Control
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View and manage all registered patients
            </p>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 py-8">
        <StudentContent />
      </div>
    </div>
  );
};

export default page;
