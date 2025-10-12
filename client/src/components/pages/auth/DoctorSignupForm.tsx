"use client";

import { DoctorSignUpAction } from "@/actions/auth/DoctorSignUpAction";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import SelectGender from "../dashboard/agentControl/SelectGender";
import SelectDoctorSpeciality from "@/components/shared/selectDoctorSpeciality";
const DoctorSignupForm = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(DoctorSignUpAction, {
    errors: {},
  });
  useEffect(() => {
    if (state.success && !isPending) {
      router.push("/auth/signin");
      toast.success(state.message);
    }
  }, [state.success, state.message, isPending, router]);
  return (
    <form action={action} className="w-full gap-4 grid grid-cols-1 mt-4">
      <Input name="name" type="text" placeholder="Name" />
      {state.errors.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}

      <Input name="email" type="email" placeholder="Email" />
      {state.errors.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <Input name="password" type="password" placeholder="Password" />
      {state.errors.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}
      <Input name="age" type="number" placeholder="Age" />
      {state.errors.age && (
        <p className="text-red-500 text-sm">{state.errors.age}</p>
      )}

      <SelectGender />
      {state.errors.gender && (
        <p className="text-red-500 text-sm">{state.errors.gender}</p>
      )}
      <SelectDoctorSpeciality />
      {state.errors.specialty && (
        <p className="text-red-500 text-sm">{state.errors.specialty}</p>
      )}

      <Input name="experience" type="text" placeholder="Experience" />
      {state.errors.experience && (
        <p className="text-red-500 text-sm">{state.errors.experience}</p>
      )}

      <Input name="bio" type="text" placeholder="Bio" />
      {state.errors.bio && (
        <p className="text-red-500 text-sm">{state.errors.bio}</p>
      )}
      <Input name="visitFee" type="number" placeholder="Visit Fee" />
      {state.errors.visitFee && (
        <p className="text-red-500 text-sm">{state.errors.visitFee}</p>
      )}
      <Input
        name="registrationNumber"
        type="number"
        placeholder="BMDC Registration Number"
      />
      {state.errors.registrationNumber && (
        <p className="text-red-500 text-sm">
          {state.errors.registrationNumber}
        </p>
      )}
      <Input name="imageUrl" type="file" placeholder="Image URL" />
      {state.errors.imageUrl && (
        <p className="text-red-500 text-sm">{state.errors.imageUrl}</p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader className="animate-spin mr-2" /> Signing Up...
          </>
        ) : (
          "Doctor Sign Up"
        )}
      </Button>
      {state.errors.formError && (
        <p className="text-red-500 text-sm">{state.errors.formError}</p>
      )}
    </form>
  );
};

export default DoctorSignupForm;
