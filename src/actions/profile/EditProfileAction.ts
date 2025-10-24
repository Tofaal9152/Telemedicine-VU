import { useMutationHandler } from "@/hooks/useMutationHandler";
import { patcher } from "@/lib/request";

export const useUpdateProfile = ({
  fetcherUrl,
  queryKey,
}: {
  fetcherUrl: string;
  queryKey: string[];
}) => {
  return useMutationHandler({
    mutationFn: (payload: any) => patcher(fetcherUrl, payload),
    queryKey,
    successMessage: "Profile updated successfully",
  });
};
