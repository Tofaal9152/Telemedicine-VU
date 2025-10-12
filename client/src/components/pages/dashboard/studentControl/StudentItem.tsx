import CustomImage from "@/components/ui/Image";
import DeleteButton from "@/lib/DeleteButton";

const PatientItem = ({ item }: any) => {
  console.log(item);

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 space-y-6 transition-all">
      {/* Header: Image, Name, and ID */}
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
        {/* <span className="text-sm text-gray-500 dark:text-gray-400">
          ID: {item.id}
        </span> */}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-semibold">Email:</span> {item.email}
        </div>
        <div>
          <span className="font-semibold">Age:</span> {item.age}
        </div>
        <div>
          <span className="font-semibold">Gender:</span> {item.gender}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {item.role}
        </div>
        <div>
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(item.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <DeleteButton
          resourceUrl={`/admin/patient/${item.id}`}
          queryKey="admin-all-patients"
          confirmMessage={`Sure you want to delete patient ${item.name}?`}
        />
      </div>
    </div>
  );
};

export default PatientItem;
