"use client";
import apiClient from "@/lib/apiClient";
import HandleError from "@/lib/errorHandle";
import { validateForm } from "@/lib/validateForm";
import { PatientRegisterType } from "@/types/auth";
import { PatientPublicSignupSchema } from "@/zod-schemas/auth";
import { redirect } from "next/navigation";
import { FileUploadActionServer } from "../file-upload";

export const PatientSignUpAction = async (
  _: PatientRegisterType,
  formData: FormData
): Promise<PatientRegisterType> => {
  const validationErrors = validateForm(PatientPublicSignupSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const payload: any = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      otp: formData.get("otp"),
    };
    const imageFile = formData.get("imageUrl");
    if (imageFile && (imageFile as File).size > 0) {
      payload.imageUrl = await FileUploadActionServer(imageFile as File);
    }
    const nidFrontFile = formData.get("nidFront");
    if (nidFrontFile && (nidFrontFile as File).size > 0) {
      payload.nidFront = await FileUploadActionServer(nidFrontFile as File);
    }
    const nidBackFile = formData.get("nidBack");
    if (nidBackFile && (nidBackFile as File).size > 0) {
      payload.nidBack = await FileUploadActionServer(nidBackFile as File);
    }
    await apiClient.post(`/auth/patient/signup`, payload);
  } catch (error) {
    return HandleError(error);
  }
  redirect("/auth/signin");
};
