"use client";
import { UpdateAgentAction } from "@/actions/dashboard/update-agent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetchData } from "@/hooks/useFetchData";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderPinwheelIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import SelectGender from "./SelectGender";

const EditAgentForm = ({ agentId }: { agentId: string }) => {
  const {
    data: agent,
    isLoading,
    isError,
    error,
  } = useFetchData<any>(`/administrator/agents/?id=${agentId}`, [
    "agent",
    agentId,
  ]);

  const [state, action, isPending] = useActionState(
    UpdateAgentAction.bind(null, agentId),
    {
      errors: {},
    }
  );

  const queryClient = useQueryClient();
  useEffect(() => {
    if (state.success && !isPending) {
      toast.success(state.message);
      queryClient.invalidateQueries({
        queryKey: ["agent", agentId],
      });
    }
  }, [state.success, state.message, isPending, queryClient, agentId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoaderPinwheelIcon className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-red-500 text-sm">
        <p>Error loading agent data: {error.message}</p>
      </div>
    );
  }
  return (
    <form action={action} className="mt-4">
      {state.success && (
        <p className="text-green-500 text-sm mb-6">{state.message}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <Label defaultValue={agent?.email} htmlFor="email" className="mb-2 ">
            Email
          </Label>
          <Input
            defaultValue={agent?.email}
            name="email"
            type="email"
            readOnly
            placeholder="Enter email address"
          />
          {state.errors.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="name" className="mb-2 ">
            Name
          </Label>
          <Input
            defaultValue={agent?.name}
            name="name"
            type="text"
            placeholder="Full name of the agent"
          />
          {state.errors.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="gender" className="mb-2 ">
            Gender
          </Label>
          <SelectGender defaultValue={agent?.gender} />
          {state.errors.gender && (
            <p className="text-red-500 text-sm mt-1">{state.errors.gender}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone_number" className="mb-2 ">
            Phone Number
          </Label>
          <Input
            defaultValue={agent?.phone_number}
            name="phone_number"
            type="tel"
            readOnly
            placeholder="+8801XXXXXXXXX"
          />
          {state.errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.phone_number}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="district" className="mb-2 ">
            District
          </Label>
          <Input
            defaultValue={agent?.district}
            name="district"
            type="text"
            placeholder="Enter district name"
          />
          {state.errors.district && (
            <p className="text-red-500 text-sm mt-1">{state.errors.district}</p>
          )}
        </div>

        <div>
          <Label htmlFor="institution" className="mb-2 ">
            Institution
          </Label>
          <Input
            defaultValue={agent?.institution}
            name="institution"
            type="text"
            placeholder="Enter institution name"
          />
          {state.errors.institution && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.institution}
            </p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="class_name" className="mb-2 ">
            Class Name
          </Label>
          <Input
            defaultValue={agent?.class_name}
            name="class_name"
            type="text"
            placeholder="Enter class name"
          />
          {state.errors.class_name && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.class_name}
            </p>
          )}
        </div>
        <div className="col-span-1 md:col-span-2">
          <Label htmlFor="promo_code" className="mb-2 ">
            Promo Code
          </Label>
          <Input
            defaultValue={agent?.promo_code}
            name="promo_code"
            type="text"
            placeholder="Enter promo code"
          />
          {state.errors.promo_code && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.promo_code}
            </p>
          )}
        </div>
      </div>

      {state.errors.formError && (
        <p className="text-red-500 text-sm mt-4 mb-4">
          {state.errors.formError}
        </p>
      )}

      <Button disabled={isPending} className="w-full mt-6">
        {isPending ? (
          <div className="flex items-center gap-2 justify-center">
            <LoaderPinwheelIcon className="animate-spin" />
            <span>Editing Agent...</span>
          </div>
        ) : (
          "Edit Agent"
        )}
      </Button>
    </form>
  );
};

export default EditAgentForm;
