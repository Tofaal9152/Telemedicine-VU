import { CheckCircle, User, XCircle } from "lucide-react";
import AppointMentPaymentBtn from "./AppointMentPaymentBtn";
import CustomImage from "@/components/ui/Image";

const SearchDoctorItem = ({ item }: { item: any }) => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white space-y-6 hover:bg-white/10 transition-all duration-300 shadow-lg">
      {/* Header with Image, Name, ID */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CustomImage
            src={item.imageUrl}
            alt={`${item.name}'s profile`}
            className="w-16 h-16 rounded-full"
            width={64}
            height={64}
          />
          <h2 className="text-2xl font-bold">{item.name}</h2>
        </div>
        {/* <span className="text-sm text-blue-200">ID: {item.id}</span> */}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <Info label="Email" value={item.email} />
        <Info label="Age" value={item.age} />
        <Info label="Gender" value={item.gender} />
        <Info label="Role" value={item.role} />
        <Info
          label="Created At"
          value={new Date(item.createdAt).toLocaleString()}
          className="md:col-span-2"
        />
      </div>

      {/* Doctor Details */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition">
        <h3 className="text-lg font-semibold mb-2 text-emerald-300 flex items-center gap-2">
          <User className="w-5 h-5" /> Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Info label="Specialty" value={item.doctor?.specialty} />
          <Info label="Experience" value={item.doctor?.experience} />
          <Info
            label="Bio"
            value={item.doctor?.bio}
            className="md:col-span-2"
          />
          <div>
            <span className="font-semibold text-blue-200">
              Approval Status:{" "}
            </span>
            {item.doctor?.isApproved ? (
              <span className="text-green-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Approved
              </span>
            ) : (
              <span className="text-red-400 font-semibold flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                Not Approved
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end pt-4 border-t border-white/10">
        <AppointMentPaymentBtn doctorId={item.id} />
      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: any;
  className?: string;
}) => (
  <div className={`space-y-1 ${className}`}>
    <span className="text-blue-200 text-sm font-medium">{label}</span>
    <p className="text-white font-semibold text-base line-clamp-1 ">
      {value || "N/A"}
    </p>
  </div>
);

export default SearchDoctorItem;
