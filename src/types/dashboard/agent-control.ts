export type AgentControlType = {
  success?: boolean;
  message?: string;
  errors: {
    name?: string[];
    email?: string[];
    gender?: "male" | "female";
    phone_number?: string[];
    district?: string[];
    promo_code?: string[];
    institution?: string[];
    class_name?: string[];
    formError?: string[];
  };
};
