"use client";
import GradientText from "@/components/feature/text/gradientText";
import ArrowRightIcon from "@/components/svg/ArrowRightIcon";
import FacebookIcon from "@/components/svg/FacebookIcon";
import InstagramIcon from "@/components/svg/InstagramIcon";
import LinkedInIcon from "@/components/svg/LinkedInIcon";
import YoutubeIcon from "@/components/svg/YoutubeIcon";
import { useGetSystemSettings } from "@/hooks/feature/useGetSystemSettings";
import { useGetUserRole } from "@/hooks/feature/useGetUserRole";
import Image from "next/image";
import Link from "next/link";

import useDefaultLocale from "@/hooks/useDefaultLocale";

function Footer() {
  const local = useDefaultLocale();
  const { isAdmin, isRoleReady } = useGetUserRole();
  const { getSystemSettings } = useGetSystemSettings();
  return (
    <div className="hidden md:block">
      <div className="flex-none mt-16">
        <div
          className={
            !isRoleReady || isAdmin
              ? "hidden"
              : "flex items-center flex-col text-center border-b border-solid"
          }
        >
          <GradientText
            label="Download TOI Community App"
            className="text-xl font-medium mb-6"
          />

          <div className="flex gap-3 mb-12 xl:mb-20">
            <Link href="#">
              <Image
                width={220}
                height={64}
                src="/images/all/app_store.png"
                alt="app store"
              />
            </Link>
            <Link href="#">
              <Image
                width={220}
                height={64}
                src="/images/all/play_store.png"
                alt="play store"
              />
            </Link>
          </div>

          <div className="mb-5">
            <p className="text-default-200 text-base font-medium flex items-center flex-col md:flex-row tracking-[-0.04em]">
              To learn more about TOI Network{" "}
              <Link href="#" className="ml-1 text-primary flex items-center">
                Visit TOI.Network{" "}
                <ArrowRightIcon className="rotate-180 w-6 ml-1" />
              </Link>
            </p>
          </div>
        </div>
        {/* Footer Top */}
        <div
          className={!isRoleReady || isAdmin ? "hidden" : "text-center py-4"}
        >
          <p className="text-default-200 font-medium mb-2 tracking-[-0.04em]">
            TOIN listing on exchanges
          </p>
          <Link href="#">
            <Image
              width={154}
              height={36}
              className="m-auto"
              src="/images/all/koinpark.png"
              alt="koinpark"
            />
          </Link>
        </div>
        {/* Footer Middle */}
        <div className="flex flex-wrap gap-4  item-center text-base font-medium tracking-[-0.04em] text-default-200  py-5 px-6 border-t border-border">
          <ul className="flex flex-none items-center justify-center gap-10">
            <li>
              <Link
                href={`/${local}/user/terms-and-conditions`}
                className="hover:text-white tracking-[-0.04em] transition ease-in-out duration-300"
              >
                Terms & Condition
              </Link>
            </li>
            <li>
              <Link
                href={`/${local}/user/privacy-policy`}
                className="hover:text-white tracking-[-0.04em] transition ease-in-out duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href={`/${local}/user/disclaimer`}
                className="hover:text-white tracking-[-0.04em] transition ease-in-out duration-300"
              >
                Disclaimer
              </Link>
            </li>
          </ul>
          <p className="flex-1 text-center ">
            &copy; TOI DLT Foundation. All rights reserved
          </p>
          <ul className="flex-none flex items-center gap-3">
            <li>
              <Link
                href={
                  getSystemSettings?.facebookUrl
                    ? getSystemSettings.facebookUrl
                    : "#"
                }
                target="__blank"
                className="hover:text-white transition ease-in-out duration-300 "
              >
                <FacebookIcon className="size-5" />
              </Link>
            </li>
            <li>
              <Link
                href={
                  getSystemSettings?.youtubeUrl
                    ? getSystemSettings.youtubeUrl
                    : "#"
                }
                target="__blank"
                className="hover:text-white transition ease-in-out duration-300"
              >
                <YoutubeIcon />
              </Link>
            </li>
            <li>
              <Link
                href={
                  getSystemSettings?.linkedinUrl
                    ? getSystemSettings.linkedinUrl
                    : "#"
                }
                target="__blank"
                className="hover:text-white transition ease-in-out duration-300"
              >
                <LinkedInIcon className="size-5" />
              </Link>
            </li>
            <li>
              <Link
                href={
                  getSystemSettings?.instagramUrl
                    ? getSystemSettings.instagramUrl
                    : "#"
                }
                target="__blank"
                className="hover:text-white transition ease-in-out duration-300"
              >
                <InstagramIcon className="size-5" />
              </Link>
            </li>

            {/* <li>
              <Link
                href="https://www.facebook.com/"
                target="__blank"
                className="hover:text-white transition ease-in-out duration-300"
              >
                <TwitterIcon className="size-5" />
              </Link>
            </li> */}
            {/* <li>
              <Link
                href="https://www.facebook.com/"
                target="__blank"
                className="hover:text-white transition ease-in-out duration-300"
              >
                <DiscordIcon className="size-5" />
              </Link>
            </li> */}
            {/* <li>
              <Link
                href="https://www.facebook.com/"
                target="__blank"
                className="hover:text-white transition ease-in-out duration-300"
              >
                <TiktokIcon className="size-5" />
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
