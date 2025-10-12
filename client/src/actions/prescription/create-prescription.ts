import { useMutationHandler } from "@/hooks/useMutationHandler";
import { patcher, poster } from "@/lib/request";

export function CreatePrescriptionAction(queryKey: string[]) {
  return useMutationHandler({
    mutationFn: (data) => poster(`/prescription`, data),
    queryKey,
  });
}

export function EditPrescriptionAction({prescriptionId,queryKey}: {prescriptionId: string, queryKey: string[]}) {
  return useMutationHandler({
    mutationFn: (data) => patcher(`/prescription/${prescriptionId}`, data),
    queryKey,
  });
}
