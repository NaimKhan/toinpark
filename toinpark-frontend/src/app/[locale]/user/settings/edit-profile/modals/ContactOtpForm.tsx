"use client";

import { useEffect, useState } from "react";
import OtpField from "@/components/modules/auth/otp/form/OtpField";
import { OTP_LENGTH, otpArray } from "@/components/modules/auth/otp/form/utils";
import { InputOTP } from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";
import {
  useOldIdentityVerificationMutation,
  useNewIdentityVerifiedMutation,
} from "@/store/api/kyc/kyc-api";
import { TVerifyResp } from "@/store/api/user-profile/user-profile.types";
import { TNullish } from "@/store/api/common-api-types";
import { CornerUpLeft } from "lucide-react";
import { useResendOtpMutation } from "@/store/api/auth/auth-api";
import { UseFormReturn } from "react-hook-form";
import { TUserProfileSchema } from "../userProfileSchema";

type Props = {
  otpUniqueKey?: string;
  onClose: () => void;
  setFirstVerificationRes: (res: string | TVerifyResp | TNullish) => void;
  setOpenStepTwo: (open: boolean) => void;
  mode: "STEP_1" | "STEP_3";
  onSuccess?: () => void;
  form: UseFormReturn<TUserProfileSchema>;
};

export default function ContactOtpForm({
  onClose,
  otpUniqueKey,
  setFirstVerificationRes,
  setOpenStepTwo,
  mode,
  onSuccess,
  form,
}: Props) {
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const error = form.watch("otpError");
  const setError = (val: string | null) => form.setValue("otpError", val || "");

  const [currentOtpUniqueKey, setCurrentOtpUniqueKey] = useState<
    string | undefined
  >(otpUniqueKey);

  useEffect(() => {
    setCurrentOtpUniqueKey(otpUniqueKey);
  }, [otpUniqueKey]);

  const [oldIdentityVerification, { isLoading: isOldIdentityLoading }] =
    useOldIdentityVerificationMutation();
  const [newIdentityVerified, { isLoading: isNewIdentityLoading }] =
    useNewIdentityVerifiedMutation();

  const isLoading = isOldIdentityLoading || isNewIdentityLoading;

  const [resendOtp, { isLoading: isResendOtpLoading }] = useResendOtpMutation();

  const handleVerifyOtp = async (value: string) => {
    if (!currentOtpUniqueKey || isLoading) return;

    const toastId = toast({
      title: "Verifying OTP...",
      description: "Please wait while we verify your OTP...",
      variant: "loading",
    });

    try {
      if (mode === "STEP_1") {
        const res = await oldIdentityVerification({
          otpUniqueKey: currentOtpUniqueKey,
          otp: value,
        }).unwrap();

        toastId.update({
          id: toastId.id,
          title: "Identity verified successfully",
          description: "Step 1 complete. Please provide your new info.",
          variant: "success",
        });

        if (res?.success) {
          setFirstVerificationRes(res.data);
          onClose();
          setOpenStepTwo(true);
        }
      } else {
        const res = await newIdentityVerified({
          otpUniqueKey: currentOtpUniqueKey,
          otp: value,
        }).unwrap();

        toastId.update({
          id: toastId.id,
          title: "Verification Successful",
          description: "Your contact details have been updated.",
          variant: "success",
        });

        if (res?.success) {
          if (onSuccess) await onSuccess();
          onClose();
        }
      }
    } catch (err) {
      const errorMessage = getApiMessage(err);
      setError(errorMessage);
      toastId.update({
        id: toastId.id,
        title: "Verification failed",
        description: errorMessage,
        variant: "error",
      });
    }
  };

  const handleResendOtp = async () => {
    if (!currentOtpUniqueKey || isResendOtpLoading) return;
    const toastId = toast({
      title: "Resending OTP...",
      description: "Please wait while we resend your OTP...",
      variant: "loading",
    });

    try {
      const response = await resendOtp({
        otpUniqueKey: currentOtpUniqueKey,
      }).unwrap();

      setCurrentOtpUniqueKey(response?.data?.otpUniqueKey);
      setOtp("");
      setError(null);

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "OTP has been resent successfully",
      });
    } catch {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: "Please try again",
      });
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center my-1"
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        <InputOTP
          maxLength={OTP_LENGTH}
          className="text-xl"
          value={otp}
          disabled={isLoading || isResendOtpLoading}
          onChange={(value) => {
            if (isLoading) return;

            setOtp(value);
            setError(null);
            if (value.length === OTP_LENGTH) {
              handleVerifyOtp(value);
            }
          }}
        >
          <div className="flex w-full justify-center gap-3">
            {otpArray.map((_, index) => (
              <OtpField
                key={index}
                index={index}
                isFocused={false}
                totalLength={OTP_LENGTH}
                value={otp}
                isError={!!error}
              />
            ))}
          </div>
        </InputOTP>
        {error && (
          <p className="text-destructive text-sm mt-4 font-medium text-center">
            {error}
          </p>
        )}
      </form>

      <div className="flex justify-center mt-5">
        <button
          type="button"
          className="flex items-center gap-2 hover:text-primary"
          onClick={handleResendOtp}
          disabled={isResendOtpLoading}
        >
          <CornerUpLeft className="size-6" />
          Resend OTP
        </button>
      </div>
    </>
  );
}
