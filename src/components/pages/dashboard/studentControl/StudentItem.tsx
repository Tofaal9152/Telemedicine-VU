import CustomImage from "@/components/ui/Image";
import DeleteButton from "@/lib/DeleteButton";
import { Calendar, CreditCard, Mail, User } from "lucide-react";

const PatientItem = ({ item }: any) => {
  const patient = item.patient ?? {};

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all hover:shadow-lg">
      {/* Coloured header strip */}
      <div className="relative h-20 bg-linear-to-r from-violet-500 to-purple-600">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white to-transparent" />
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
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
            <User className="w-3 h-3" /> Patient
          </span>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <InfoRow icon={<Mail className="w-4 h-4 text-violet-500" />} label="Email" value={item.email} />
          <InfoRow icon={<User className="w-4 h-4 text-purple-500" />} label="Gender / Age" value={`${item.gender}, ${item.age} yrs`} />
          <InfoRow icon={<Calendar className="w-4 h-4 text-gray-400" />} label="Joined" value={new Date(item.createdAt).toLocaleDateString()} />
        </div>

        {/* NID Documents */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" /> NID Documents
          </h3>
          {!patient.nidFront && !patient.nidBack ? (
            <p className="text-xs text-gray-400 dark:text-gray-600 italic">NID জমা দেওয়া হয়নি</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {(["nidFront", "nidBack"] as const).map((key) => {
                const url = patient[key];
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
          <DeleteButton
            resourceUrl={`/admin/patient/${item.id}`}
            queryKey="admin-all-patients"
            confirmMessage={`Sure you want to delete patient ${item.name}?`}
          />
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

export default PatientItem;
