"use client";

import LoadingButton from "@/components/ui/LoadingButton";
import apiClient from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps {
  resourceUrl: string;
  queryKey: string | string[];
  confirmMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

const DeleteButton = ({
  resourceUrl,
  queryKey,
  errorMessage = "Delete failed",
  successMessage = "Deleted successfully",
  confirmMessage = "Are you sure you want to delete this item?",
}: DeleteButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => apiClient.delete(`${resourceUrl}`),
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
    <LoadingButton
      variant="destructive"
      size="sm"
      isLoading={isPending}
      onClick={() => {
        if (confirm(confirmMessage)) {
          mutate();
        }
      }}
    >
      {isPending ? (
        <Loader className="w-4 h-4 mr-1 animate-spin" />
      ) : (
        <Trash2Icon className="w-4 h-4 mr-1" />
      )}
    </LoadingButton>
  );
};

export default DeleteButton;
