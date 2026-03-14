"use client";

import { useState } from "react";
import { InputOTP } from "@/components/ui/input-otp";
import OtpField from "./OtpField";
import { OTP_LENGTH, otpArray } from "./utils";
import { useVerifyOtpMutation } from "@/store/api/auth/auth-api";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useToast } from "@/components/ui/use-toast";
import { getRoleBasedRedirectRoute } from "@/lib/auth-utils/route-owner";
import { useRouter } from "@/components/navigation";
import { TOtpParams } from "../types";

function OtpForm() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { getAParamValue } = useManageSearchParams<TOtpParams>();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const { toast } = useToast();
  const otpUniqueKey = getAParamValue("otpUniqueKey");

  const handleVerifyOtp = async (otpValue: string) => {
    if (!otpUniqueKey || isLoading) {
      return;
    }

    const toastId = toast({
      title: "Verifying OTP...",
      description: "Please wait while we verify your OTP...",
      variant: "loading",
    });

    try {
      const loginRes = await verifyOtp({
        otpUniqueKey,
        otp: otpValue,
      }).unwrap();
      toastId.update({
        id: toastId.id,
        title: "OTP verified successfully",
        description: "Your OTP has been verified successfully",
        variant: "success",
      });

      const rawRole = loginRes?.data?.user?.role;
      const dashboardRoute = getRoleBasedRedirectRoute(rawRole);
      router.replace(dashboardRoute);
    } catch (error) {
      console.info("verifyOtp error: ", error);
      toastId.update({
        id: toastId.id,
        title: "OTP verification failed",
        description: "Please try again",
        variant: "error",
      });
    }
  };
  return (
    <form className="flex justify-center" noValidate>
      <InputOTP
        maxLength={OTP_LENGTH}
        className="text-xl"
        value={otp}
        disabled={isLoading}
        onChange={(value) => {
          if (isLoading) {
            return;
          }
          setOtp(value);
          if (value.length === OTP_LENGTH) {
            handleVerifyOtp(value);
          }
        }}
      >
        <div className="flex w-full justify-center gap-3">
          {otpArray?.map((_, index) => (
            <OtpField
              key={index}
              index={index}
              isFocused={false}
              totalLength={6}
              value={otp}
              isError={false}
            />
          ))}
        </div>
      </InputOTP>
    </form>
  );
}

export default OtpForm;
