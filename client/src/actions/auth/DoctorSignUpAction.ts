"use client";
import apiClient from "@/lib/apiClient";
import HandleError from "@/lib/errorHandle";
import { validateForm } from "@/lib/validateForm";
import { DoctorRegisterType } from "@/types/auth";
import { DoctorRegisterSchema } from "@/zod-schemas/auth";
import { FileUploadActionServer } from "../file-upload";

export const DoctorSignUpAction = async (
  previousState: DoctorRegisterType,
  formData: FormData
): Promise<DoctorRegisterType> => {
  const validationErrors = validateForm(DoctorRegisterSchema, formData);

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
      specialty: formData.get("specialty"),
      experience: formData.get("experience"),
      bio: formData.get("bio"),
      visitFee: Number(formData.get("visitFee")),
      registrationNumber: formData.get("registrationNumber"),
    };
    const imageFile = formData.get("imageUrl");
    if (imageFile && (imageFile as File).size > 0) {
      payload.imageUrl = await FileUploadActionServer(imageFile as File);
    }
    console.log("Payload for doctor signup:", payload);
    const res = await apiClient.post(`/auth/doctor/signup`, payload);

    console.log(res.data);
    return {
      success: true,
      message: "Doctor registered successfully",
      errors: {},
    };
  } catch (error) {
    return HandleError(error);
  }
};
