"use client";

import Link from "next/link";
import DoctorSignupForm from "@/components/pages/auth/DoctorSignupForm";
import PatientSignupForm from "@/components/pages/auth/PatientSignupForm";
import CustomImage from "@/components/ui/Image";
import imagePath from "@/constants/imagePath";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignupPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-emerald-900 p-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-4xl flex flex-col-reverse md:flex-row items-center gap-8 transition-all duration-500 hover:shadow-3xl hover:bg-white/15">
        {/* Left Side: Sign Up Form */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in">
            Create an Account
          </h1>
          <p className="text-blue-100 text-sm mb-4">
            Choose your role to sign up
          </p>

          <Tabs defaultValue="patient" className="w-full ">
            <TabsList className="w-full grid grid-cols-2 mb-4 bg-transparent border-b-2 border-blue-300">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>
            <TabsContent value="patient">
              <PatientSignupForm />
            </TabsContent>
            <TabsContent value="doctor">
              <DoctorSignupForm />
            </TabsContent>
          </Tabs>

          <p className="text-sm text-blue-200 mt-4">
            Already have an account?{" "}
            <Link href="/auth/signin" className="hover:underline text-blue-300">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <CustomImage
              src={imagePath.patientImage}
              alt="Signup Illustration"
              width={240}
              height={240}
              className="relative rounded-full border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
