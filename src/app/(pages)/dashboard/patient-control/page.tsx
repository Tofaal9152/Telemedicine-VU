import StudentContent from "@/components/pages/dashboard/studentControl/StudentContent";

const page = async () => {
  return (
    <div className="p-6 InterFont">
      <div>
        <h2 className="text-2xl font-bold InterFont">All Patients</h2>
        <p className="text-sm text-muted-foreground mb-4 InterFont">
          Below is the list of all patients currently in the system
        </p>
      </div>
      <StudentContent />
    </div>
  );
};

export default page;
