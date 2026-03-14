import { getSeoMeta } from "@/lib/getSeoMeta";
import Image from "next/image";
import GradientText from "@/components/feature/text/gradientText";
import ResetPasswordForm from "@/components/modules/auth/ResetPasswordForm";
import Link from "next/link";
import useDefaultLocale from "@/hooks/useDefaultLocale";

export const metadata = getSeoMeta({ title: "Reset Password" });

export default function ResetPassword() {
  const local = useDefaultLocale();
  return (
    <div className="relative h-auto md:h-screen flex items-start justify-center px-4 overflow-y-auto">
      <div
        className="absolute w-full h-full bg-no-repeat bg-cover opacity-80 left-[100px] top-[60px] md:left-[-300px] md:top-[40px] 
                   lg:left-[-500px] lg:top-[25px] xl:left-[-772px] xl:top-[17px] rotate-[15deg] md:rotate-[0deg]"
        style={{
          backgroundImage: "url('/images/all/background.png')",
        }}
      ></div>

      <div className="relative z-10 w-full md:w-xl flex flex-col items-center space-y-16 md:space-y-20 xl:space-y-24 my-11 ">
        <Link href={`/${local}/user/dashboard`}>
          <Image
            src="/images/logo/app-logo.png"
            alt="TOI Logo"
            width={80}
            height={80}
          />
        </Link>

        <div className="w-full space-y-12">
          <div className="text-center space-y-2">
            <GradientText
              label="Reset password"
              className="text-[28px] md:text-4xl lg:text-5xl font-medium"
            />
            <p className="text-default-200 text-xl">
              Please enter the following information to reset your password
            </p>
          </div>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
