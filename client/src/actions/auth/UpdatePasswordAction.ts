import { useMutationHandler } from "@/hooks/useMutationHandler";
import { patcher } from "@/lib/request";

export const useUpdatePassword = () => {
  return useMutationHandler({
    mutationFn: (payload: any) => patcher("/auth/change-password", payload),
    successMessage: "Password updated successfully",
  });
};
