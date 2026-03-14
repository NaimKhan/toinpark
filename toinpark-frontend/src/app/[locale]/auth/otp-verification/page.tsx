import { getSeoMeta } from "@/lib/getSeoMeta";
import OtpWrapper from "@/components/modules/auth/otp/OtpWrapper";
import ResendOtp from "@/components/modules/auth/otp/ResendOtp";
import OtpForm from "@/components/modules/auth/otp/form";

export const metadata = getSeoMeta({ title: "OTP Verification" });

function OtpVerificationNew() {
  return (
    <OtpWrapper>
      <OtpForm />
      <ResendOtp />
    </OtpWrapper>
  );
}

export default OtpVerificationNew;
