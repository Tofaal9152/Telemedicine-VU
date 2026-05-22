"use client";

import { DoctorSignUpAction } from "@/actions/auth/DoctorSignUpAction";
import apiClient from "@/lib/apiClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CameraImageCapture from "@/components/shared/CameraImageCapture";
import { Loader, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import SelectGender from "../dashboard/agentControl/SelectGender";
import SelectDoctorSpeciality from "@/components/shared/selectDoctorSpeciality";

const DoctorSignupForm = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(DoctorSignUpAction, {
    errors: {},
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpError, setOtpError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success && !isPending) {
      router.push("/auth/signin");
      toast.success(state.message);
    }
  }, [state.success, state.message, isPending, router]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const sendOtp = async () => {
    const email = emailRef.current?.value?.trim();
    if (!email) {
      setOtpError("আগে email দিন");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    try {
      await apiClient.post("/auth/send-otp", { email });
      setOtpSent(true);
      setCountdown(60);
      toast.success("OTP আপনার email এ পাঠানো হয়েছে");
    } catch (err: any) {
      setOtpError(err?.response?.data?.message ?? "OTP পাঠাতে সমস্যা হয়েছে");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <form action={action} className="w-full gap-4 grid grid-cols-1 mt-4">
      <Input name="name" type="text" placeholder="Name" />
      {state.errors.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}

      {/* Email + Send OTP */}
      <div className="flex gap-2">
        <Input
          ref={emailRef}
          name="email"
          type="email"
          placeholder="Email"
          className="flex-1"
        />
        <button
          type="button"
          onClick={sendOtp}
          disabled={otpLoading || countdown > 0}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {otpLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : countdown > 0 ? (
            <span className="tabular-nums">{countdown}s</span>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              {otpSent ? "Resend" : "Send OTP"}
            </>
          )}
        </button>
      </div>
      {state.errors.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}
      {otpError && <p className="text-red-400 text-sm">{otpError}</p>}

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

      <CameraImageCapture name="imageUrl" label="প্রোফাইল ছবি" aspect="square" />
      {state.errors.imageUrl && (
        <p className="text-red-500 text-sm">{state.errors.imageUrl}</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <CameraImageCapture name="nidFront" label="NID সামনের দিক" aspect="landscape" />
          {state.errors.nidFront && (
            <p className="text-red-500 text-sm mt-1">{state.errors.nidFront}</p>
          )}
        </div>
        <div>
          <CameraImageCapture name="nidBack" label="NID পিছনের দিক" aspect="landscape" />
          {state.errors.nidBack && (
            <p className="text-red-500 text-sm mt-1">{state.errors.nidBack}</p>
          )}
        </div>
      </div>

      {/* OTP input — visible after Send OTP */}
      {otpSent && (
        <div className="space-y-2 p-4 rounded-2xl border border-white/20 bg-white/5">
          <p className="text-sm font-medium text-white/90 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            OTP কোড দিন
          </p>
          <Input
            name="otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit OTP"
            className="tracking-[0.5em] text-center text-xl font-mono"
          />
          {state.errors.otp && (
            <p className="text-red-500 text-sm">{state.errors.otp}</p>
          )}
          <p className="text-xs text-white/40">
            আপনার email চেক করুন। OTP ১০ মিনিট পর্যন্ত valid।
          </p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isPending || !otpSent}
      >
        {isPending ? (
          <>
            <Loader className="animate-spin mr-2" /> Signing Up...
          </>
        ) : (
          "Doctor Sign Up"
        )}
      </Button>
      {!otpSent && (
        <p className="text-center text-xs text-white/40">
          Submit করতে আগে OTP পাঠান
        </p>
      )}
      {state.errors.formError && (
        <p className="text-red-500 text-sm">{state.errors.formError}</p>
      )}
    </form>
  );
};

export default DoctorSignupForm;
