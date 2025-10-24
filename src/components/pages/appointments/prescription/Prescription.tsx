"use client";
import { Button } from "@/components/ui/button";
import LoadingErrorWrapper from "@/components/ui/LoadingErrorWrapper";
import ApiDeleteButton from "@/hooks/ApiDeleteButton";
import { useFetchData } from "@/hooks/useFetchData";
import { formatDate } from "@/lib/DateConverter";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import DoctorPrescriptionEditContent from "./DoctorPrescriptionEditContent";
const Prescription = ({
  appointmentId,
  session,
}: {
  appointmentId: string;
  session: any;
}) => {
  const {
    data: prescriptionData,
    isPending,
    error,
    isError,
  } = useFetchData<any>(`/prescription/appointment/${appointmentId}`, [
    "prescription",
    appointmentId,
  ]);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const data = prescriptionData?.result;
  return (
    <LoadingErrorWrapper
      isLoading={isPending}
      error={error}
      isError={isError}
      isEmpty={data === null}
    >
      <div
        ref={contentRef}
        className="bg-white text-black p-4 sm:p-6 md:p-8 rounded shadow-sm w-full max-w-screen-md mx-auto my-4 border overflow-x-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">
              Telemedicine Prescription
            </h1>
            <p className="text-sm text-gray-600">Telemedicine, Bangladesh</p>
            <p className="text-sm text-gray-600">Phone: +880 123-456-789</p>
          </div>
          <div className="text-right">
            <p className="text-sm">
              <strong>Date:</strong> {formatDate(data?.createdAt)}
            </p>
            <p className="text-sm">
              <strong>Appointment ID:</strong> {appointmentId}
            </p>
          </div>
        </div>

        {/* Patient & Doctor Info */}
        <div className="flex justify-between mb-6">
          <div>
            <p>
              <strong>Patient:</strong> {data?.patient?.user?.name || "N/A"}
            </p>
            <p>
              <strong>Age:</strong> {data?.patient?.user?.age || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {data?.patient?.user?.gender || "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>Doctor:</strong> {data?.doctor?.user?.name || "N/A"}
            </p>
            <p>
              <strong>Specialty:</strong> {data?.doctor?.specialty || "General"}
            </p>
          </div>
        </div>

        {/* Diagnosis & Symptoms */}
        <div className="mb-6">
          <p>
            <strong>Symptoms:</strong> {data?.symptoms}
          </p>
          <p>
            <strong>Diagnosis:</strong> {data?.diagnosis}
          </p>
        </div>

        {/* Medication Table */}
        <div className="mb-6 overflow-x-auto">
          <h3 className="font-semibold mb-2">Medications</h3>
          <table className="w-full min-w-[500px] border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Medicine</th>
                <th className="border p-2 text-left">Dosage</th>
                <th className="border p-2 text-left">Frequency</th>
                <th className="border p-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              {data?.medications?.map((med: any, i: number) => (
                <tr key={i}>
                  <td className="border p-2">{med.name}</td>
                  <td className="border p-2">{med.dosage}</td>
                  <td className="border p-2">{med.frequency}</td>
                  <td className="border p-2">{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes & Signature */}
        <div className="mb-6">
          <p>
            <strong>Advice:</strong> {data?.notes}
          </p>
        </div>

        <div className="text-right mt-12">
          <p className="mb-2">
            ___________{data?.doctor?.user?.name}___________
          </p>
          <p className="text-sm">Doctor&apos;s Signature</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-4 pt-4 mt-4 border-t-4">
        <Button
          onClick={reactToPrintFn}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold "
        >
          Download as PDF
        </Button>
        {session?.user?.role === "DOCTOR" && (
          <>
            <DoctorPrescriptionEditContent
              prescriptionData={data}
              appointmentId={appointmentId}
            />
            <ApiDeleteButton
              endPoint={`/prescription/${data?.id}`}
              queryKey={["prescription", appointmentId]}
              confirmMessage="Are you sure you want to delete this prescription?"
              successMessage="Prescription deleted successfully."
              errorMessage="Failed to delete prescription."
            />
          </>
        )}
      </div>
    </LoadingErrorWrapper>
  );
};

export default Prescription;
