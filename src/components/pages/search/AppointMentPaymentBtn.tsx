"use client";

import { AppointmentAction } from "@/actions/appointment/appointment";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const AppointMentPaymentBtn = ({ doctorId }: { doctorId: string }) => {
  const router = useRouter();
  const [state, action, isLoading] = useActionState(AppointmentAction, {
    success: false,
    message: "",
    redirectUrl: "",
    errors: {},
  });

  useEffect(() => {
    if (state.success && !isLoading && state.redirectUrl) {
      router.push(state.redirectUrl);
    } else if (state.errors.formError && !isLoading) {
      toast.error(state.errors.formError);
    }
  }, [
    state.success,
    isLoading,
    router,
    state.redirectUrl,
    state.errors.formError,
  ]);

  return (
    <form action={action}>
      <input type="hidden" name="doctorId" value={doctorId} />

      <Button variant={"outline"} type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : (
          <CreditCard className="w-5 h-5" />
        )}
        <span className="font-semibold">Pay & Consult</span>
      </Button>
    </form>
  );
};

export default AppointMentPaymentBtn;
