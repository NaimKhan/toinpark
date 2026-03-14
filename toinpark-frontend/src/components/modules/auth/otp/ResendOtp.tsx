"use client";
import Loader from "@/components/feature/loader/loader";
import { useToast } from "@/components/ui/use-toast";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useResendOtpMutation } from "@/store/api/auth/auth-api";
import { CornerUpLeft } from "lucide-react";

function ResendOtp() {
  const [resendOtp, { isLoading }] = useResendOtpMutation();
  const { getAParamValue, updateAParam } = useManageSearchParams<{
    otpUniqueKey: string;
  }>();
  const otpUniqueKey = getAParamValue("otpUniqueKey");
  const { toast } = useToast();
  const handleResendOtp = async () => {
    if (!otpUniqueKey || isLoading) {
      return;
    }
    try {
      const response = await resendOtp({ otpUniqueKey }).unwrap();
      toast({
        title: "OTP Resent Successfully",
        description: "OTP has been resent successfully",
        variant: "success",
      });
      updateAParam({
        key: "otpUniqueKey",
        value: response?.data?.otpUniqueKey,
      });
    } catch {
      toast({
        title: "Failed to Resend OTP",
        description: "Please try again",
        variant: "error",
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="flex items-center gap-2 hover:text-primary cursor-pointer"
        onClick={handleResendOtp}
      >
        <CornerUpLeft className="size-6" /> Resend OTP
      </button>
    </div>
  );
}

export default ResendOtp;
