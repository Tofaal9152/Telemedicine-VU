import { z } from "zod";

export const AgentControlSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    name: z.string().min(1, "Please enter a valid name"),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "Please select a valid gender" }),
    }),
    phone_number: z.string().min(11, "Please enter a valid phone number"),
    district: z.string().min(1, "Please enter a valid district"),
    institution: z.string().min(1, "Please enter a valid institution"),
    class_name: z.string().min(1, "Please enter a valid class name"),
    promo_code: z.string().optional(),
    
});
