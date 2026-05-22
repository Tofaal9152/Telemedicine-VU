import CustomImage from "@/components/ui/Image";
import DeleteButton from "@/lib/DeleteButton";
import ToggleActivateButton from "./ToggleActivateButton";
import {
  Award,
  BadgeCheck,
  Calendar,
  CreditCard,
  Mail,
  Stethoscope,
  User,
  Wallet,
  XCircle,
} from "lucide-react";

const DoctorItem = ({ item }: any) => {
  const doctor = item.doctor ?? {};
  const isApproved = doctor.isApproved;

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all hover:shadow-lg">
      {/* Coloured header strip */}
      <div className="relative h-20 bg-linear-to-r from-blue-600 to-indigo-500">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white to-transparent" />

        {/* Approval badge */}
        <div className="absolute top-3 right-3">
          {isApproved ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/60 dark:text-green-300">
              <BadgeCheck className="w-3.5 h-3.5" /> Approved
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-300">
              <XCircle className="w-3.5 h-3.5" /> Pending
            </span>
          )}
        </div>
      </div>

      {/* Avatar + Name row */}
      <div className="px-5 pb-0 -mt-8 flex items-end gap-4">
        <div className="ring-4 ring-white dark:ring-gray-900 rounded-full shadow-lg shrink-0">
          <CustomImage
            src={item.imageUrl}
            alt={item.name}
            className="w-16 h-16 rounded-full object-cover"
            width={64}
            height={64}
          />
        </div>
        <div className="pb-2 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {item.name}
          </h2>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
            <Stethoscope className="w-3.5 h-3.5" />
            {doctor.specialty ?? "—"} · {doctor.experience ?? "—"}
          </p>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <InfoRow icon={<Mail className="w-4 h-4 text-blue-500" />} label="Email" value={item.email} />
          <InfoRow icon={<User className="w-4 h-4 text-purple-500" />} label="Gender / Age" value={`${item.gender}, ${item.age} yrs`} />
          <InfoRow icon={<Wallet className="w-4 h-4 text-green-500" />} label="Visit Fee" value={`৳ ${doctor.visitFee ?? "—"}`} />
          <InfoRow icon={<Award className="w-4 h-4 text-amber-500" />} label="BMDC Reg" value={doctor.registrationNumber ?? "—"} />
          <InfoRow icon={<Calendar className="w-4 h-4 text-gray-400" />} label="Joined" value={new Date(item.createdAt).toLocaleDateString()} />
        </div>

        {/* Bio */}
        {doctor.bio && (
          <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5 leading-relaxed">
            {doctor.bio}
          </p>
        )}

        {/* NID Documents */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" /> NID Documents
          </h3>
          {!doctor.nidFront && !doctor.nidBack ? (
            <p className="text-xs text-gray-400 dark:text-gray-600 italic">NID জমা দেওয়া হয়নি</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {(["nidFront", "nidBack"] as const).map((key) => {
                const url = doctor[key];
                const label = key === "nidFront" ? "সামনের দিক" : "পিছনের দিক";
                if (!url) return null;
                return (
                  <div key={key} className="space-y-1">
                    <p className="text-[11px] font-medium text-gray-400">{label}</p>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="block group">
                      <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 aspect-85/54 bg-gray-100 dark:bg-gray-800">
                        <img src={url} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                          <span className="text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-0.5 rounded">
                            বড় করে দেখুন ↗
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-400">
            ID: <span className="font-mono">{item.id.slice(0, 12)}…</span>
          </span>
          <div className="flex gap-2">
            <ToggleActivateButton
              resourceUrl={`/admin/doctor/${item.id}/approval`}
              queryKey="admin-all-doctors"
              isActive={isApproved}
            />
            <DeleteButton
              resourceUrl={`/admin/doctor/${item.id}`}
              queryKey="admin-all-doctors"
              confirmMessage={`Sure you want to delete doctor ${item.name}?`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
    <span className="shrink-0">{icon}</span>
    <span className="text-gray-400 dark:text-gray-500 text-xs">{label}:</span>
    <span className="font-medium text-sm truncate">{value}</span>
  </div>
);

export default DoctorItem;
