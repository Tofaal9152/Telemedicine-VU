"use client";

import { Button } from "@/components/ui/button";
import { deleter } from "@/lib/request";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps {
  endPoint: string;
  queryKey: QueryKey;
  confirmMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}
const ApiDeleteButton = ({
  endPoint,
  queryKey,
  errorMessage = "failed",
  successMessage = "success",
  confirmMessage = "Are you sure you want to delete this?",
}: DeleteButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleter(`${endPoint}`),
    onSuccess: () => {
      toast.success(successMessage);
      if (queryKey) queryClient.invalidateQueries({ queryKey });
    },
    onError: (err: any) => {
      toast.error(err?.message || errorMessage);
    },
  });

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        if (confirm(confirmMessage)) {
          mutate();
        }
      }}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash2Icon className="w-4 h-4 mr-1" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default ApiDeleteButton;
