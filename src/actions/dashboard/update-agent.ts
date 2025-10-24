// "use server";
import apiClient from "@/lib/apiClient";
// import apiServer from "@/lib/apiServer";
import HandleError from "@/lib/errorHandle";
import { validateForm } from "@/lib/validateForm";
import { AgentControlType } from "@/types/dashboard/agent-control";
import { AgentControlSchema } from "@/zod-schemas/dashboard/agent-control";

export const UpdateAgentAction = async (
  agentId: string,
  previousState: AgentControlType,
  formData: FormData
): Promise<AgentControlType> => {
  const validationErrors = validateForm(AgentControlSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      phone_number: formData.get("phone_number"),
      district: formData.get("district"),
      institution: formData.get("institution"),
      class_name: formData.get("class_name"),
      promo_code: formData.get("promo_code"),
    };
    await apiClient.put(`/administrator/agents/?id=${agentId}`, payload);
    return {
      success: true,
      message: "Agent updated successfully!",
      errors: {},
    };
  } catch (error) {
    return HandleError(error);
  }
};
