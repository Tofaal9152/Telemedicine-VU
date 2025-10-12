import { z } from "zod";

export const AppointmentSchema = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),
});
