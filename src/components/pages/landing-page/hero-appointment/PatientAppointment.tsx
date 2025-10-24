import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "@/components/ui/LoadingButton";
import { Award, Calendar, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

const PatientAppointment = ({ item }: { item: any }) => (
  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300  hover:shadow-2xl group">
    <CardHeader>
      <CardTitle className="text-xl font-bold flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-300" />
        Consultation
      </CardTitle>
      <CardDescription className="text-blue-100">
        with {item.doctor?.user?.name || "Unknown Doctor"}
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-emerald-300" />
          <span className="text-sm font-medium">
            {item?.doctor?.specialty || "Unknown Specialty"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <Calendar className="w-4 h-4 mx-auto mb-1 text-blue-300" />
          <p className="text-xs text-blue-200">Date</p>
          <p className="text-sm font-semibold">
            {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <Clock className="w-4 h-4 mx-auto mb-1 text-emerald-300" />
          <p className="text-xs text-blue-200">Time</p>
          <p className="text-sm font-semibold">
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div
        className={`rounded-lg p-3 border ${
          item?.status === "PAID"
            ? "bg-green-500/20 border-green-400/30"
            : "bg-yellow-500/20 border-yellow-400/30"
        }`}
      >
        <p className="text-xs text-blue-200 mb-1">Status</p>
        <p className="font-semibold flex items-center gap-2">
          {item?.status === "PAID" ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Clock className="w-4 h-4 text-yellow-400" />
          )}
          {item?.status}
        </p>
      </div>
    </CardContent>

    <CardFooter>
      <Link href={`/appointments/${item?.id}`}>
        <LoadingButton className="w-full bg-gradient-to-r from-green-500 to-emerald-900 hover:from-green-300 hover:to-emerald-600 transform transition-all duration-200 text-white ">
          View Details
        </LoadingButton>
      </Link>
    </CardFooter>
  </Card>
);
export default PatientAppointment;
