"use client";
import Image from "next/image";
import Link from "next/link";
import GradientText from "../feature/text/gradientText";
import { useGetSystemSettings } from "@/hooks/feature/useGetSystemSettings";
import useDefaultLocale from "@/hooks/useDefaultLocale";

export default function AuthBackground({
  children,
  title = "Welcome to TOI Community",
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  const { getSystemSettings } = useGetSystemSettings();
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
              src={
                getSystemSettings?.logoMedia?.url ?? "/images/logo/app-logo.png"
              } 
              alt="TOI Logo"
              width={80}
              height={80}
            />
          </Link>

          <div className="w-full space-y-12">
            <div className="text-center space-y-2">
              <GradientText
                label={title}
                className="text-[28px] md:text-4xl lg:text-5xl font-medium pb-1"
              />
              <p className="text-default-200 text-xl">{description}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
