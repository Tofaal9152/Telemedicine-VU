"use client";
import { CreatePrescriptionAction } from "@/actions/prescription/create-prescription";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const DoctorPrescriptionForm = ({
  data,
  appointmentId,
}: {
  data: any;
  appointmentId: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = CreatePrescriptionAction(["prescription", appointmentId]);
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "" },
  ]);

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", duration: "" },
    ]);
  };
  const handleMedicationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMeds = [...medications];
    updatedMeds[index][field as keyof (typeof updatedMeds)[0]] = value;
    setMedications(updatedMeds);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      appointmentId,
      patientId: data?.patientId,
      doctorId: data?.doctorId,
      symptoms,
      diagnosis,
      medications: medications.filter(
        (med) => med.name && med.dosage && med.frequency && med.duration
      ),
      notes,
    });
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Textarea
        placeholder="Symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="w-full p-4 rounded-lg border"
      />
      <Textarea
        placeholder="Diagnosis..."
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        className="w-full p-4 rounded-lg border"
      />

      {/* Dynamic Medication List */}
      <div className="space-y-4">
        {medications.map((med, index) => (
          <div key={index} className="grid grid-cols-4 gap-2">
            <Input
              placeholder="Name"
              value={med.name}
              onChange={(e) =>
                handleMedicationChange(index, "name", e.target.value)
              }
              className="col-span-1 border p-2 rounded"
            />
            <Input
              placeholder="Dosage"
              value={med.dosage}
              onChange={(e) =>
                handleMedicationChange(index, "dosage", e.target.value)
              }
              className="col-span-1 border p-2 rounded"
            />
            <Input
              placeholder="Frequency"
              value={med.frequency}
              onChange={(e) =>
                handleMedicationChange(index, "frequency", e.target.value)
              }
              className="col-span-1 border p-2 rounded"
            />
            <Input
              placeholder="Duration"
              value={med.duration}
              onChange={(e) =>
                handleMedicationChange(index, "duration", e.target.value)
              }
              className="col-span-1 border p-2 rounded"
            />
          </div>
        ))}
        <Button type="button" onClick={addMedication}>
          + Add Medicine
        </Button>
      </div>

      <Textarea
        placeholder="Advice/Notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-4 rounded-lg border"
      />
      <DialogClose asChild>
        <Button type="submit" variant="outline">
          Save Prescription
        </Button>
      </DialogClose>
    </form>
  );
};

export default DoctorPrescriptionForm;
