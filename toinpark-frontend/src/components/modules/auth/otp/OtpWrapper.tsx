import GradientText from "@/components/feature/text/gradientText";
import { getFallbackImage } from "@/lib/media/getFallbackImage";
import Image from "next/image";
import Link from "next/link";
import useDefaultLocale from "@/hooks/useDefaultLocale";

export default function OtpWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const local = useDefaultLocale();
  return (
    <div className="relative h-auto md:h-screen px-4 overflow-hidden">
      <div className="w-full h-full overflow-x-hidden overflow-y-auto flex items-start justify-center">
        <div
          className="absolute w-full h-full bg-no-repeat bg-cover opacity-80 left-[100px] top-[60px] md:left-[-300px] md:top-[40px] 
                   lg:left-[-500px] lg:top-[25px] xl:left-[-772px] xl:top-[17px] rotate-[15deg] md:rotate-[0deg]"
          style={{
            backgroundImage: "url('/images/all/background.png')",
          }}
        ></div>

        <div className="relative z-10 w-full md:w-xl flex flex-col items-center space-y-16 md:space-y-20 xl:space-y-24 my-10">
          <Link href={`/${local}/user/dashboard`}>
            <Image
              src={getFallbackImage({ src: "/images/logo/app-logo.png" })}
              alt="TOI Logo"
              width={80}
              height={80}
            />
          </Link>

          <div className="w-full space-y-12">
            <div className="text-center space-y-2">
              <GradientText
                label="Confirm Your Identity"
                className="text-[28px] md:text-4xl lg:text-5xl font-medium pb-1"
              />
              <p className="text-default-200 text-xl">Enter the OTP we just sent you to securely access your account.</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
