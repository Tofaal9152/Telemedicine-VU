import { Award, Calendar, CheckCircle } from "lucide-react";

const PaymentItem = ({ item, isDoctor }: { item: any; isDoctor: boolean }) => {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white space-y-6 hover:bg-white/10 transition-all duration-300 shadow-xl">
      {/* Header */}
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold">
          {item.name || item.patient?.user?.name}
        </h2>
        <span className="text-sm text-blue-200 font-medium">ID: {item.id}</span>
      </div>

      {/* Transaction Info */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-green-400 font-semibold">
          <CheckCircle className="w-5 h-5" />
          <span>Transaction ID: </span>
          <span className="text-white">{item.tranId}</span>
        </div>
        <div className="text-sm text-blue-100">
          <Calendar className="inline w-4 h-4 mr-1" />
          Created At: {new Date(item.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Doctor Info */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition duration-300">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-emerald-300">
          <Award className="w-5 h-5" />
          {isDoctor ? "Patient Details" : "Doctor Details"}
        </h3>
        {isDoctor ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Info label="Age" value={item.patient?.user?.age} />

            <Info label="Bio" value={item.patient?.user?.bio} />
            <Info
              className="md:col-span-2"
              label="Email"
              value={item.patient?.user?.email}
            />
            <div>
              <span className="font-medium text-blue-200">Status: </span>
              <span
                className={`font-bold ${
                  item.status === "PAID" ? "text-green-400" : "text-yellow-300"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Info label="Specialty" value={item.doctor?.specialty} />
            <Info label="Experience" value={item.doctor?.experience} />
            <Info label="Visit Fee" value={`${item.doctor?.visitFee} BDT`} />
            <Info
              label="Bio"
              value={item.doctor?.bio}
              className="md:col-span-2"
            />
            <div>
              <span className="font-medium text-blue-200">Status: </span>
              <span
                className={`font-bold ${
                  item.status === "PAID" ? "text-green-400" : "text-yellow-300"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        )}
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
    <p className="text-white font-semibold text-base">{value || "N/A"}</p>
  </div>
);

export default PaymentItem;
