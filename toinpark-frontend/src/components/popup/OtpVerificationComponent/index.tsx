"use client";

import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

interface OtpVerificationComponentProps {
  email?: string;
  phone?: string;
  backUrl?: string;
  resendUrl?: string;
  verifyPasswordResetForWardUrl?: string;
}

const OtpVerificationComponent: React.FC<OtpVerificationComponentProps> = ({
  email,
  phone,
  backUrl = "/dashboard/user-profile",
  resendUrl = "#",
}) => {
  return (
    <div className="flex h-dvh min-h-dvh w-full items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center justify-center w-full max-w-[524px] p-6 md:px-[42px] md:py-[44px] text-center">
        {/* Email Icon + Circle Decoration */}
        <div className="relative mb-6 hidden md:flex items-center justify-center">
          <Mail
            size={64}
            className="rounded-2xl border-2 p-3 text-default-600"
          />
          {[7, 14, 21, 28, 35, 42, 49].map((size, i) => (
            <div
              key={i}
              className={`border-secondary-100 absolute -z-10 h-[${size}rem] w-[${size}rem] overflow-hidden rounded-full border opacity-${
                45 - i * 5
              }`}
            ></div>
          ))}
        </div>

        {/* Message Section */}
        <div className="mb-6">
          <h4 className="mb-2 font-medium text-default-100">
            Check your {email ? "email" : "phone"} for a verification code.
          </h4>
          <div className="text-base text-default-600">
            We&apos;ve sent a code to{" "}
            <span className="text-default-700">
              {email || phone || "your account"}
            </span>
          </div>
        </div>

        {/* OTP Verification Form */}

        {/* Resend Code */}
        <div className="mt-10 flex items-center justify-center space-x-1 text-sm font-medium text-default-600">
          <span>Didn&apos;t get a code?</span>
          <Link href={resendUrl} className="cursor-pointer text-default-700">
            Click to resend
          </Link>
        </div>

        {/* Back Link */}
        <Link
          href={backUrl}
          className="mx-auto mt-10 flex items-center justify-center gap-2 text-sm font-medium text-default-600 hover:text-default-800"
        >
          <ArrowLeft />
          <span>Back</span>
        </Link>
      </div>
    </div>
  );
};

export default OtpVerificationComponent;
