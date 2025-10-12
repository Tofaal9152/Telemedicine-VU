import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pen } from "lucide-react";
import DoctorPrescriptionEditForm from "./DoctorPrescriptionEditForm";
const DoctorPrescriptionEditContent = ({
  prescriptionData,
  appointmentId,
}: {
  prescriptionData: any;
  appointmentId: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <Pen className="w-5 h-5" />
          Edit Prescription
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Prescription</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill out the prescription details below. Ensure all information is
          accurate before saving.
        </DialogDescription>
        <DoctorPrescriptionEditForm
          prescriptionData={prescriptionData}
          appointmentId={appointmentId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DoctorPrescriptionEditContent;
