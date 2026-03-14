import OtpVerificationComponent from "@/components/popup/OtpVerificationComponent";

function OtpVerificationPage() {
  return (
    <OtpVerificationComponent
      email="example@gmail.com"
      backUrl="/dashboard/user-profile"
      resendUrl="/resend-otp"
      verifyPasswordResetForWardUrl="/dashboard/user-profile/set-new-password"
    />
  );
}

export default OtpVerificationPage;
