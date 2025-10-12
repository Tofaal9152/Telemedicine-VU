import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "@/components/ui/LoadingButton";
import { Award, CheckCircle, Mail, User, XCircle } from "lucide-react";
import Link from "next/link";

const DoctorAppointment = ({ item }: { item: any }) => (
  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 hover:shadow-2xl group">
    <CardHeader className="space-y-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <User className="w-5 h-5 text-blue-300" />
          {item?.patient?.user?.name}
        </CardTitle>
        {item?.status === "PAID" ? (
          <CheckCircle className="w-6 h-6 text-green-400 animate-pulse" />
        ) : (
          <XCircle className="w-6 h-6 text-red-400" />
        )}
      </div>
      <CardDescription className="text-blue-100 flex items-center gap-2">
        <Award className="w-4 h-4" />
        {item?.patient?.user?.gender}
      </CardDescription>
    </CardHeader>

    <CardContent>
      <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-2">
        <Mail className="w-4 h-4 text-blue-200" />
        <p className="text-sm text-blue-100">{item?.patient?.user?.email}</p>
      </div>
      <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-2 mt-4">
        <div className=" text-blue-200">age:</div>
        <p className="text-sm text-blue-100">{item?.patient?.user?.age}</p>
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

export default DoctorAppointment;
