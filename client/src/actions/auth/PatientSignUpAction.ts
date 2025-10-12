"use client";
import apiClient from "@/lib/apiClient";
import HandleError from "@/lib/errorHandle";
import { validateForm } from "@/lib/validateForm";
import { PatientRegisterType } from "@/types/auth";
import { PatientRegisterSchema } from "@/zod-schemas/auth";

import { redirect } from "next/navigation";
import { FileUploadActionServer } from "../file-upload";

export const PatientSignUpAction = async (
  previousState: PatientRegisterType,
  formData: FormData
): Promise<PatientRegisterType> => {
  const validationErrors = validateForm(PatientRegisterSchema, formData);

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
    };
    const imageFile = formData.get("imageUrl");
    if (imageFile && (imageFile as File).size > 0) {
      payload.imageUrl = await FileUploadActionServer(imageFile as File);
    }
    console.log("Payload for patient signup:", payload);
    const res = await apiClient.post(`/auth/patient/signup`, payload);

    console.log(res.data);
  } catch (error) {
    return HandleError(error);
  }
  redirect("/auth/signin");
};
