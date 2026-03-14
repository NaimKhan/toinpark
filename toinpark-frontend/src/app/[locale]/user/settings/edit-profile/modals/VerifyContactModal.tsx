"use client";

import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/popup/CustomDialog";
import {
  useLazyCrossCheckSendOtpQuery,
  useLazySameIdentitySendOtpQuery,
} from "@/store/api/kyc/kyc-api";
import RenderData from "@/components/feature/loader/RenderData";
import ContentLoader from "@/components/feature/loader/ContentLoader";
import { UseFormReturn } from "react-hook-form";
import { TUserProfileSchema } from "../userProfileSchema";
import ContactOtpForm from "./ContactOtpForm";
import { TVerifyResp } from "@/store/api/user-profile/user-profile.types";
import { TNullish } from "@/store/api/common-api-types";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { useEffect, useState } from "react";

interface VerifyContactModalProps {
  open: boolean;
  onClose: () => void;
  value: string;
  type: "email" | "phone";
  flow: "CASE_1" | "CASE_2" | "CASE_3" | null;
  setFirstVerificationRes: (res: string | TVerifyResp | TNullish) => void;
  setOpenStepTwo: (open: boolean) => void;
  form: UseFormReturn<TUserProfileSchema>;
}

export default function VerifyContactModal({
  open,
  onClose,
  value,
  type,
  flow,
  setFirstVerificationRes,
  setOpenStepTwo,
  form,
}: VerifyContactModalProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [triggerSameCheck, sameCheckState] = useLazySameIdentitySendOtpQuery();
  const [triggerCrossCheck, crossCheckState] = useLazyCrossCheckSendOtpQuery();

  const activeQueryState = flow === "CASE_2" ? crossCheckState : sameCheckState;
  const { data: getKycOtpRes, error, isError, isLoading } = activeQueryState;

  useEffect(() => {
    if (!open) {
      setIsConfirmed(false);
    }
  }, [open]);

  const handleSendCode = async () => {
    try {
      if (flow === "CASE_2") {
        // Cross check usually means check via PHONE if changing email
        const targetType = type === "email" ? "phone" : "email";
        await triggerCrossCheck({ typeOf: targetType }).unwrap();
      } else {
        await triggerSameCheck({ typeOf: type }).unwrap();
      }
      setIsConfirmed(true);
    } catch (err) {
      console.error("Failed to send verification code", err);
    }
  };

  const emailOrPhoneVerifyData = getKycOtpRes?.data;
  const uniqueKey = emailOrPhoneVerifyData?.uniqueKey;

  const fieldErrors = getFieldErrors(error);
  const apiErrorMessage =
    Object.values(fieldErrors)[0] ||
    (error as any)?.data?.message ||
    "Something went wrong. Please try again.";

  const title = isError
    ? "Verification Failed"
    : !isConfirmed
      ? `Change ${type === "email" ? "Email" : "Phone Number"}`
      : `Verify Identity`;

  const getConfirmationMessage = () => {
    if (flow === "CASE_2") {
      const targetIdentity =
        type === "email" ? "phone number" : "email address";
      return `To change your ${type}, we need to verify your identity via your ${targetIdentity}.`;
    }
    return `To change your ${type}, please verify your current ${type} address.`;
  };

  const getSuccessMessage = () => {
    if (flow === "CASE_2") {
      const targetSource = type === "email" ? "SMS" : "email";
      return `We’ve sent a verification ${targetSource} to your verified ${
        type === "email" ? "phone" : "email"
      }. Please enter the OTP below.`;
    }
    return `We’ve sent a verification ${
      type === "email" ? "email" : "SMS"
    } to ${value}. Please enter the OTP below.`;
  };

  const description = isError
    ? apiErrorMessage
    : !isConfirmed
      ? getConfirmationMessage()
      : getSuccessMessage();

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
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        {!isConfirmed && !isError ? (
          <>
            <p className="text-center text-sm text-muted-foreground">
              {flow === "CASE_2" ? (
                <>
                  Identity will be verified via your{" "}
                  <span className="font-semibold text-foreground">
                    verified {type === "email" ? "phone" : "email"}
                  </span>
                </>
              ) : (
                <>
                  Your current {type} address is{" "}
                  <span className="font-semibold text-foreground">{value}</span>
                </>
              )}
            </p>
            <Button
              className="w-fit py-6 font-semibold"
              onClick={handleSendCode}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </Button>
          </>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center min-h-[150px] text-center space-y-4">
            <p className="text-destructive text-sm font-medium">
              {apiErrorMessage}
            </p>
            <Button variant="outline" onClick={onClose} className="w-[256px]">
              Close
            </Button>
          </div>
        ) : (
          <RenderData
            expectedDataType="object"
            data={emailOrPhoneVerifyData}
            {...activeQueryState}
            loadingSkeleton={<ContentLoader className="!min-h-[10vh]" />}
          >
            <ContactOtpForm
              setFirstVerificationRes={setFirstVerificationRes}
              onClose={onClose}
              otpUniqueKey={uniqueKey}
              setOpenStepTwo={setOpenStepTwo}
              mode="STEP_1"
              form={form}
            />
          </RenderData>
        )}
      </div>
    </CustomDialog>
  );
}
