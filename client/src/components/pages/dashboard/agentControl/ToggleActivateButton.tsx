"use client";

import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PowerIcon } from "lucide-react";
import { toast } from "sonner";

interface ToggleActivateButtonProps {
  isActive: boolean;
  resourceUrl: string;
  queryKey: string | string[];
  confirmMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

const ToggleActivateButton = ({
  resourceUrl,
  queryKey,
  isActive,
  errorMessage = `Error Occurred`,
  successMessage = `Item ${
    isActive ? "deactivated" : "activated"
  } successfully`,
  confirmMessage = `Are you sure you want to ${
    isActive ? "deactivate" : "activate"
  } this doctor?`,
}: ToggleActivateButtonProps) => {
  const queryClient = useQueryClient();
console.log(`ToggleActivateButton: ${resourceUrl} - ${queryKey} - ${isActive}`);
  const { mutate, isPending } = useMutation({
    mutationFn: () => apiClient.patch(`${resourceUrl}`,{
      isApproved: !isActive,
    }),
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.invalidateQueries({
        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
      });
    },
    onError: (err: any) => {
      toast.error(err?.message || errorMessage);
    },
  });

  return (
    <Button
      variant="outline"
      className="text-black dark:text-gray-400"
      size="sm"
      disabled={isPending}
      onClick={() => {
        if (confirm(confirmMessage)) {
          mutate();
        }
      }}
    >
      {isActive ? (
        <>
          <PowerIcon className="w-4 h-4 mr-1 text-red-500" />
        </>
      ) : (
        <>
          <PowerIcon className="w-4 h-4 mr-1 text-green-500" />
        </>
      )}
    </Button>
  );
};

export default ToggleActivateButton;
