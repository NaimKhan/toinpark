"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  useDeleteProfileImgMutation,
  useUploadProfileImgMutation,
} from "@/store/api/user-profile/user-profile-api";
import { getFallbackImage } from "@/lib/media/getFallbackImage";
import { useToast } from "@/components/ui/use-toast";
import { TString } from "@/store/api/common-api-types";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

interface ProfileSectionProps {
  profileImageUrl?: TString;
}
export default function ProfileSection({
  profileImageUrl,
}: ProfileSectionProps) {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadProfileImg, { isLoading: uploading }] =
    useUploadProfileImgMutation();

  const [deleteProfileImg, { isLoading: deleting }] =
    useDeleteProfileImgMutation();

  useEffect(() => {
    setPreview(profileImageUrl || null);
  }, [profileImageUrl]);

  const handleChangeImage = () => fileInputRef.current?.click();
  const uploadImage = async (file: File) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we upload your image.",
    });

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const res = await uploadProfileImg({ body: formData }).unwrap();

      if (res.success) {
        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Success",
          description: "Profile image updated successfully!",
        });
      } else {
        toastId.update({
          id: toastId.id,
          variant: "error",
          title: "Failed to upload image",
          description: "Please try again.",
        });
      }
    } catch (error) {
      toastId.update({
        id: toastId.id,
        title: "Something went wrong while uploading.",
        description: getApiMessage(error) || "Please try again.",
        variant: "error",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    uploadImage(file);
  };

  const handleDeleteImage = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we delete your image.",
    });

    try {
      const res = await deleteProfileImg().unwrap();
      setPreview(null);

      if (res.success) {
        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Success",
          description: "Profile image deleted successfully!",
        });
      } else {
        toastId.update({
          id: toastId.id,
          variant: "error",
          title: "Failed to delete image",
          description: "Please try again.",
        });
      }
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error) || "Something went wrong while deleting.",
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <Image
        src={getFallbackImage({ src: preview })}
        alt="Profile Image"
        width={160}
        height={160}
        className="rounded-full !w-32 !md:w-40 !h-32 !md:h-40 object-cover"
      />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex gap-2">
        <Button
          disabled={uploading || deleting}
          variant="outline"
          className="text-primary border-primary/20 px-6 py-4"
          onClick={handleChangeImage}
        >
          Change Picture
        </Button>

        <Button
          disabled={uploading || deleting}
          variant="outline"
          className="text-destructive border-destructive/20 hover:bg-destructive/90 hover:text-default-100 px-5 py-4"
          onClick={handleDeleteImage}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
