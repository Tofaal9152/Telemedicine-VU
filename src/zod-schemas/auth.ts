import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(1, "please enter a valid password"),
});

const otpField = z
  .string()
  .length(6, "OTP must be exactly 6 digits");

export const PatientRegisterSchema = z.object({
  name: z.string().min(1, "Please enter a valid name"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Minimum password length is 6 characters"),
  age: z.string().min(1, "Please enter a valid age"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a valid gender",
  }),
});

export const PatientPublicSignupSchema = PatientRegisterSchema.extend({
  otp: otpField,
});

export const DoctorRegisterSchema = z.object({
  name: z.string().min(1, "Please enter a valid name"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Minimum password length is 6 characters"),
  age: z.string().min(1, "Please enter a valid age"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a valid gender",
  }),
  specialty: z.string().min(1, "Please enter a valid specialty"),
  experience: z.string().min(1, "Please enter a valid experience"),
  bio: z.string().min(1, "Please enter a valid bio"),
  visitFee: z.string().min(1, "Please enter a valid visit fee"),
  registrationNumber: z
    .string()
    .min(1, "Please enter a valid BMDC registration number"),
});

export const DoctorPublicSignupSchema = DoctorRegisterSchema.extend({
  otp: otpField,
});
