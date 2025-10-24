"use client";
import LoadingErrorWrapper from "@/components/ui/LoadingErrorWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFetchData } from "@/hooks/useFetchData";
import { MessageCircle, User, Video } from "lucide-react";
import Call from "./call/Call";
import Chat from "./chat/Chat";
import DoctorData from "./doctor/PatientData";
import PatientData from "./patient/DoctorData";
import Prescription from "./prescription/Prescription";
const AppointmentsPage = ({
  appointmentId,
  isDoctor,
  session,
}: {
  appointmentId: string;
  isDoctor: boolean;
  session: any;
}) => {
  const { data, isPending, error, isError } = useFetchData<any>(
    `/appointments/${appointmentId}`,
    ["appointment", appointmentId]
  );
console.log(data)
  return (
    <LoadingErrorWrapper isLoading={isPending} error={error} isError={isError}>
      <Tabs defaultValue="profile" className="flex flex-col min-h-[70vh]">
        <TabsList className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl  text-white border border-white/20 hover:bg-white/15 transition-all duration-500 hover:shadow-3xl">
          <TabsTrigger value="profile">
            <User className="w-5 h-5" />
            {isDoctor ? "Patient Data" : "Doctor Data"}
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageCircle className="w-5 h-5" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="video">
            <Video className="w-5 h-5" />
            Video Call
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="flex flex-col flex-1 pb-12 space-y-4">
          {isDoctor ? (
            <DoctorData data={data} appointmentId={appointmentId} />
          ) : (
            <PatientData data={data} />
          )}
          <Prescription appointmentId={appointmentId} session={session} />
        </TabsContent>
        <TabsContent
          value="chat"
          className="flex flex-col flex-1 h-full overflow-hidden pb-12"
        >
          <Chat data={data} session={session} />
        </TabsContent>

        <TabsContent value="video" className="flex flex-col flex-1 pb-12">
          <Call data={data} session={session} />
        </TabsContent>
      </Tabs>
    </LoadingErrorWrapper>
  );
};

export default AppointmentsPage;
