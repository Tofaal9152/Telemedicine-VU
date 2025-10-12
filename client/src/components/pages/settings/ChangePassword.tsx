"use client";
import { z } from "zod";
import { SmartForm, SmartFormField } from "@/components/smart-form";
import { useUpdatePassword } from "@/actions/auth/UpdatePasswordAction";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

const ChangePasswordForm = () => {
  const mutation = useUpdatePassword();

  const handleSubmit = async (data: PasswordFormData) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <SmartForm
        schema={passwordSchema}
        mutationFn={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full container mx-auto text-white space-y-6"
        submitText={mutation.isPending ? "Updating..." : "Change Password"}
        onSuccess={() => console.log("Password changed successfully")}
        onError={(error) => console.error("Failed:", error)}
      >
        {(form) => (
          <div className="space-y-4">
            <SmartFormField
              form={form}
              name="oldPassword"
              type="password"
              label="Old Password"
              placeholder="Enter current password"
              description="Enter your current password to verify your identity."
            />
            <SmartFormField
              form={form}
              name="newPassword"
              type="password"
              label="New Password"
              placeholder="Enter new password"
              description="Choose a strong password that you haven't used before."
            />
            <SmartFormField
              form={form}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Re-enter new password"
              description="Re-enter your new password to confirm."
            />
          </div>
        )}
      </SmartForm>
    </div>
  );
};

export default ChangePasswordForm;
