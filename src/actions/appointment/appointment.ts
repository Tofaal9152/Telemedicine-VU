"use server";
import apiServer from "@/lib/apiServer";
// import apiClient from "@/lib/apiClient";
import HandleError from "@/lib/errorHandle";
import { getSession } from "@/lib/session";
import { validateForm } from "@/lib/validateForm";
import { AppointmentType } from "@/types/appointment/appointment";
import { AppointmentSchema } from "@/zod-schemas/appointment/AppointmentSchema";

export const AppointmentAction = async (
  previousState: AppointmentType,
  formData: FormData
): Promise<AppointmentType> => {
  const session = await getSession();
  if (!session?.user) {
    return {
      success: false,
      message: "User not authenticated",
      redirectUrl: "/auth/signin",
      errors: { formError: ["Please log in to continue."] },
    };
  }
  const validationErrors = validateForm(AppointmentSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const res = await apiServer.post(`/appointments/payment`, {
      doctorId: formData.get("doctorId"),
    });
    console.log("AppointmentAction response:", res.data);
    return {
      success: true,
      message: "Redirecting to the payment page...",
      redirectUrl: res.data?.payment_url,
      errors: {},
    };
  } catch (error) {
    return HandleError(error);
  }
};
