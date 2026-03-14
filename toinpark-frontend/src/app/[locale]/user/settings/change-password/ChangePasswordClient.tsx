"use client";
import GradientText from "@/components/feature/text/gradientText";
import ChangePasswordForm from "./ChangePasswordForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LeftArrow from "@/components/svg/LeftArrow";
import useDefaultLocale from "@/hooks/useDefaultLocale";

function ChangePasswordClient() {
  const local = useDefaultLocale();
  return (
    <div className="w-full space-y-8 md:space-y-12 px-6 py-10 xl:px-16 md:px-10 md:py-12">
      <div className="flex gap-2 justify-between items-start">
        <div className="text-start space-y-2">
          <GradientText
            label="Change Password"
            className="text-[28px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap"
          />
          <p className="text-default-200 text-xl">
            Please enter the following details to change your password
          </p>
        </div>

        <Button
          asChild
          variant="default"
          className="bg-transparent border border-input md:border-none md:bg-input text-lg text-default-100 hover:text-default-900 px-2 md:px-4 !h-10 !md:h-12 "
        >
          <Link href={`/${local}/user/profile`}>
            <LeftArrow className="!w-6 !h-6" />
          </Link>
        </Button>
      </div>
      <ChangePasswordForm />
    </div>
  );
}

export default ChangePasswordClient;
