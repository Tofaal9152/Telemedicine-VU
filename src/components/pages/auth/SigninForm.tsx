"use client";

import { SigninAction } from "@/actions/auth/signin";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/LoadingButton";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { toast } from "sonner";

const SigninForm = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(SigninAction, {
    errors: {},
  });
  useEffect(() => {
    if (state.success === true && !isPending) {
      toast.success("Login successful!");
      router.replace("/");
    }
  }, [state.success, router]);
  return (
    <form action={action} className="w-full">
      <Input name="email" type="email" placeholder="Email" className="mb-4" />
      {state.errors.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <Input
        name="password"
        type="password"
        placeholder="Password"
        className="mb-4"
      />
      {state.errors.password && (
        <p className="text-red-500 text-sm">{state.errors.password}</p>
      )}

      <LoadingButton isLoading={isPending} className="w-full">
        Sign In
      </LoadingButton>

      {state.errors.formError && (
        <p className="text-red-500 text-sm mt-2">{state.errors.formError}</p>
      )}
    </form>
  );
};

export default SigninForm;
