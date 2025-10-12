"use client";
import LoadingWrapper from "@/components/LoadingWrapper";
import CustomImage from "@/components/ui/Image";
import { useFetchData } from "@/hooks/useFetchData";

const StudentDetailsItem = ({ studentId }: { studentId: string }) => {
  const { data, isLoading, error, isError } = useFetchData<any>(
    `/administrator/students/?id=${studentId}`,
    ["studentDetails", studentId]
  );

  return (
    <LoadingWrapper isLoading={isLoading} isError={isError} error={error}>
      {data && (
        <div className="w-full p-6 bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <CustomImage
              src={data.profile_picture}
              alt={data.name}
              width={100}
              height={100}
              className="rounded-full border border-zinc-300 dark:border-zinc-700 object-cover w-24 h-24"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold">{data.name}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {data.class_name} · {data.institution}
              </p>
              <p className="text-sm">{data.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
            <div>
              <span className="font-medium">Phone:</span> {data.phone_number}
            </div>
            <div>
              <span className="font-medium">District:</span> {data.district}
            </div>
            <div>
              <span className="font-medium">Gender:</span> {data.gender}
            </div>
            <div>
              <span className="font-medium">Promo Code:</span> {data.promo_code}
            </div>
            <div>
              <span className="font-medium">Used Promo Code:</span>{" "}
              {data.used_promo_code || "N/A"}
            </div>
            <div>
              <span className="font-medium">Balance:</span> ৳{data.balance}
            </div>
            <div>
              <span className="font-medium">Verified:</span>{" "}
              <span
                className={data.is_verified ? "text-green-600" : "text-red-600"}
              >
                {data.is_verified ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <span className="font-medium">Subscribed:</span>{" "}
              <span
                className={
                  data.subscription_status ? "text-green-600" : "text-red-600"
                }
              >
                {data.subscription_status ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Ambassador Details */}
          <div className="mt-6 pt-6 border-t ">
            <h3 className="text-2xl font-semibold mb-2 ">Ambassador Info</h3>
            {data.ambassador ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span>{" "}
                  {data.ambassador.name}
                </div>
                <div>
                  <span className="font-medium">Phone:</span>{" "}
                  {data.ambassador.phone_number}
                </div>
                <div>
                  <span className="font-medium">District:</span>{" "}
                  {data.ambassador.district}
                </div>
                <div>
                  <span className="font-medium">Institution:</span>{" "}
                  {data.ambassador.institution}
                </div>
                <div>
                  <span className="font-medium">Promo Code:</span>{" "}
                  {data.ambassador.promo_code}
                </div>
                <div>
                  <span className="font-medium">Active:</span>{" "}
                  <span
                    className={
                      data.ambassador.active ? "text-green-600" : "text-red-600"
                    }
                  >
                    {data.ambassador.active ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-400">No ambassador assigned.</p>
            )}
          </div>
        </div>
      )}
    </LoadingWrapper>
  );
};

export default StudentDetailsItem;
