"use client";

import { PatientSignUpAction } from "@/actions/auth/PatientSignUpAction";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import SelectGender from "../dashboard/agentControl/SelectGender";
import { Loader } from "lucide-react";
const PatientSignupForm = () => {
  const [state, action, isPending] = useActionState(PatientSignUpAction, {
    errors: {},
  });

  return (
    <form action={action} className="w-full gap-4 grid grid-cols-1 mt-4">
      <Input name="name" required type="text" placeholder="Name" />
      {state.errors.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}

      <Input name="email" required type="email" placeholder="Email" />
      {state.errors.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <Input name="password" required type="password" placeholder="Password" />
      {state.errors.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}
      <Input name="age" required type="number" placeholder="Age" />
      {state.errors.age && (
        <p className="text-red-500 text-sm">{state.errors.age}</p>
      )}

      <SelectGender />
      {state.errors.gender && (
        <p className="text-red-500 text-sm">{state.errors.gender}</p>
      )}
      <Label className="text-sm text-white">Upload Profile Image</Label>
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
          "Patient Sign Up"
        )}
      </Button>
      {state.errors.formError && (
        <p className="text-red-500 text-sm">{state.errors.formError}</p>
      )}
    </form>
  );
};

export default PatientSignupForm;
