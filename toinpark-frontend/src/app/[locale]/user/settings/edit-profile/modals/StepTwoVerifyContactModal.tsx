"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhoneInputComponent from "@/components/ui/phoneInput";
import CustomDialog from "@/components/popup/CustomDialog";
import ContactOtpForm from "./ContactOtpForm";
import { TVerifyResp } from "@/store/api/user-profile/user-profile.types";
import { TNullish } from "@/store/api/common-api-types";
import { useNewIdentityReceivedMutation } from "@/store/api/kyc/kyc-api";
import { useSignoutMutation } from "@/store/api/auth/auth-api";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { useRouter } from "@/components/navigation";
import useDefaultLocale from "@/hooks/useDefaultLocale";
import Cookies from "js-cookie";
import { UseFormReturn } from "react-hook-form";
import { TUserProfileSchema } from "../userProfileSchema";

interface StepTwoVerifyContactModalProps {
  open: boolean;
  onClose: () => void;
  value: string | TVerifyResp | TNullish;
  type: "email" | "phone";
  flow: "CASE_1" | "CASE_2" | "CASE_3" | null;
  form: UseFormReturn<TUserProfileSchema>;
  setFirstVerificationRes: React.Dispatch<
    React.SetStateAction<string | TVerifyResp | TNullish>
  >;
  setOpenStepTwo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StepTwoVerifyContactModal({
  open,
  onClose,
  form,
  value,
  type,
  flow,
  setFirstVerificationRes,
  setOpenStepTwo,
}: StepTwoVerifyContactModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const local = useDefaultLocale();
  const stage = form.watch("stage") || "NEW_INFO";
  const newInfo = form.watch("newInfo") || "";
  const otpUniqueKey = form.watch("otpUniqueKey");

  const [newIdentityReceived, { isLoading }] = useNewIdentityReceivedMutation();
  const [signout] = useSignoutMutation();

  const logId = typeof value === "string" ? value : (value as any)?.logId;

  const handleNewInfoSubmit = async () => {
    if (!newInfo) return;
    const toastId = toast({
      variant: "loading",
      title: "Sending OTP",
      description: "Please wait while we send OTP to your new contact.",
    });
    try {
      const res = await newIdentityReceived({
        logId,
        newEmailOrPhone: newInfo,
      }).unwrap();

      if (res?.success && res.data?.uniqueKey) {
        form.setValue("otpUniqueKey", res.data.uniqueKey);
        form.setValue("stage", "VERIFY_NEW");
        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "OTP Sent",
          description: `A verification code has been sent to ${newInfo}.`,
        });
      }
    } catch (err) {
      const fieldErrors = getFieldErrors(err);

      // Mapping API field "newEmailOrPhone" to local form fields
      if (fieldErrors.newEmailOrPhone) {
        const targetField = type === "email" ? "email" : "phoneNumber";
        form.setError(targetField as any, {
          type: "server",
          message: fieldErrors.newEmailOrPhone,
        });
      }

      // Also apply other field errors if any
      applyFieldErrors(fieldErrors, form.setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Failed to send OTP",
        description: getApiMessage(err),
      });
    }
  };

  const handleSignout = async () => {
    try {
      const toastId = toast({
        variant: "loading",
        title: `Loading...`,
        description: "Please wait while we apply your changes.",
      });
      await signout().unwrap();
      toastId.update({
        id: toastId.id,
        title: "Signed out",
        description: "You have been signed out.",
        variant: "success",
      });
      Cookies.remove("authinfo-Admin");
      Cookies.remove("authinfo-SuperAdmin");
      Cookies.remove("authinfo-Member");
      router.replace("/");
    } catch (error) {
      Cookies.remove("authinfo-Admin");
      Cookies.remove("authinfo-SuperAdmin");
      Cookies.remove("authinfo-Member");
      router.replace("/");
      console.error("Failed to signout", error);
    }
  };

  const handleFinalSuccess = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Updating...",
      description: "Please wait while we update your information.",
    });
    try {
      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Updated",
        description: `${
          type === "email" ? "Email" : "Phone Number"
        } updated successfully.`,
      });

      if (flow === "CASE_1") {
        handleSignout();
      }
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error),
      });
    }
  };

  const title =
    stage === "NEW_INFO"
      ? `Enter New ${type === "email" ? "Email Address" : "Phone Number"}`
      : `Verify New ${type === "email" ? "Email" : "Phone"}`;

  const description =
    stage === "NEW_INFO"
      ? `Please provide the new ${type} you wish to use for your account.`
      : `We’ve sent a verification code to ${newInfo}. Please enter it below.`;

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      hideCancelBtn
      hideConfirmBtn
      title={title}
      description={description}
      className="sm:max-w-[625px]"
    >
      <div className="flex flex-col space-y-6 pt-6 pb-16">
        {stage === "NEW_INFO" ? (
          <div className="space-y-4">
            {type === "email" ? (
              <Input
                label="New Email"
                placeholder="example@email.com"
                type="email"
                value={newInfo}
                onChange={(e) => {
                  form.setValue("newInfo", e.target.value);
                  form.setValue("email", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                // error={formState.errors.email?.message}
                error={form.formState.errors.email?.message as any}
              />
            ) : (
              <PhoneInputComponent
                label="New Phone Number"
                value={newInfo}
                onChange={(val) => {
                  form.setValue("newInfo", val);
                  form.setValue("phoneNumber", val, {
                    shouldValidate: true,
                  });
                }}
                // error={formState.errors.phoneNumber?.message}
                error={form.formState.errors.phoneNumber?.message as any}
              />
            )}
            <Button
              className="w-fit py-6 font-semibold"
              onClick={handleNewInfoSubmit}
              disabled={isLoading || !newInfo}
            >
              {isLoading ? "Sending OTP..." : "Continue"}
            </Button>
          </div>
        ) : (
          <ContactOtpForm
            onClose={onClose}
            otpUniqueKey={otpUniqueKey}
            setFirstVerificationRes={setFirstVerificationRes}
            setOpenStepTwo={setOpenStepTwo}
            mode="STEP_3"
            onSuccess={handleFinalSuccess}
            form={form}
          />
        )}
      </div>
    </CustomDialog>
  );
}
