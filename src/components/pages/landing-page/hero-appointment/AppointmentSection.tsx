"use client";
import { useInfiniteData } from "@/hooks/useInfiniteData";
import { InfiniteScroller } from "@/lib/InfiniteScroller";
import DoctorAppointment from "./DoctorAppointment";
import PatientAppointment from "./PatientAppointment";

const AppointmentSection = ({ role }: { role?: string }) => {
  const isDoctor = role === "DOCTOR";
  const endPoint =
    role === "DOCTOR"
      ? "/appointments/doctor/paid"
      : "/appointments/patient/paid";
  const queryKey =
    role === "DOCTOR" ? "doctor-appointments" : "patient-appointments";
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteData<any>(endPoint, queryKey);

  const dataset = data?.pages.flatMap((page) => page.results) ?? [];
  console.log(dataset);
  return (
    <div className="space-y-8 pt-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          {isDoctor ? "Your Patients" : "Your Appointments"}
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mx-auto"></div>
      </div>
      <InfiniteScroller
        items={dataset}
        isLoading={isLoading}
        isError={isError}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        renderItem={(item) =>
          isDoctor ? (
            <DoctorAppointment key={item.id} item={item} />
          ) : (
            <PatientAppointment key={item.id} item={item} />
          )
        }
      />
    </div>
  );
};

export default AppointmentSection;
