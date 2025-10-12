import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMutationHandler<TData, TVariables>({
  mutationFn,
  queryKey,
  successMessage,
  errorMessage,
  onSuccess,
  onError,
}: UseMutationHandlerOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
      if (successMessage) {
        toast.success(successMessage);
      }
      if (onSuccess) onSuccess(data);
    },
    onError: (error: any) => {
      // Log full error object (stack trace included)
      console.error("Mutation error:", error);

      // Extract user-friendly message (try multiple places)
      const userMessage =
        error?.response?.data?.message || // API error message (preferred)
        error?.message || // JS error message fallback
        "An error occurred"; // Generic fallback

      // Show only user-friendly message in toast
      toast.error(errorMessage || userMessage);

      if (onError) onError(error);
    },
  });
}
type UseMutationHandlerOptions<TData, TVariables> = {
  mutationFn: (data: TVariables) => Promise<TData>;
  queryKey?: QueryKey;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};
