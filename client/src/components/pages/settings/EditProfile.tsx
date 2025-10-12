"use client";
import { FileUploadAction } from "@/actions/file-upload";
import { useUpdateProfile } from "@/actions/profile/EditProfileAction";
import { SmartForm, SmartFormField } from "@/components/smart-form";
import { Input } from "@/components/ui/input";
import GetProfileData from "@/hooks/GetProfileData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.string().regex(/^\d+$/, "Age must be a number"),
  gender: z.enum(["male", "female"]),
  role: z.enum(["PATIENT", "DOCTOR"]),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const EditProfile = ({ role }: { role: any }) => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { query, queryKey, fetcherUrl } = GetProfileData({ role });

  const fileUploadMutation = FileUploadAction();
  const mutation = useUpdateProfile({ fetcherUrl, queryKey });

  // 👇 Create a preview URL for the selected file
  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl); // Clean up
      };
    }
  }, [imageFile]);

  const handleSubmit = async (data: ProfileFormData) => {
    let res: any;
    if (imageFile) {
      res = await fileUploadMutation.mutateAsync({ file: imageFile });
    }

    mutation.mutate({
      ...data,
      imageUrl: res?.data?.url || query.data.imageUrl || "",
    });
  };

  if (query.isLoading) return <div>Loading...</div>;

  const defaultValues: ProfileFormData = {
    name: query.data.name || "",
    email: query.data.email || "",
    age: query.data.age || "",
    gender: query.data.gender === "male" ? "male" : "female",
    role: query.data.role || "PATIENT",
  };

  return (
    <div>
      <div className="flex flex-col space-y-4 items-center mb-6 ring-2 ring-white/20 p-4 rounded-2xl shadow-2xl">
        <Image
          src={previewUrl || query.data.imageUrl}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full mb-4 border-2 border-white/20 shadow-lg w-24 h-24 object-cover"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
            }
          }}
        />
      </div>

      <SmartForm
        key={JSON.stringify(defaultValues)}
        schema={profileSchema}
        mutationFn={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full container mx-auto text-white space-y-6"
        defaultValues={defaultValues}
        queryKey={queryKey}
        submitText={mutation.isPending ? "Updating..." : "Update Profile"}
        onSuccess={() => {
          router.push("/");
        }}
        onError={(error) => console.error("Error:", error)}
      >
        {(form) => (
          <div className="space-y-4">
            <SmartFormField
              form={form}
              name="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
            />
            <SmartFormField
              form={form}
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <SmartFormField
              form={form}
              name="age"
              type="text"
              label="Age"
              placeholder="Enter your age"
            />
            <SmartFormField
              form={form}
              name="gender"
              type="select"
              label="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
            <SmartFormField
              form={form}
              name="role"
              type="select"
              label="Role"
              options={[
                { value: "PATIENT", label: "Patient" },
                { value: "DOCTOR", label: "Doctor" },
              ]}
              disabled
            />
          </div>
        )}
      </SmartForm>
    </div>
  );
};

export default EditProfile;
