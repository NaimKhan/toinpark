"use client";
import GradientText from "@/components/feature/text/gradientText";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import ArrowUpFillIcon from "@/components/svg/ArrowUpFillIcon";
import Image from "next/image";
import WarningIcon from "@/components/svg/WarningIcon";
import { useGetSystemSettings } from "@/hooks/feature/useGetSystemSettings";
import { useGetAirDropActiveEventQuery } from "@/store/api/user-dashboard/user-dashboard-api";

export function AirdropProgressCard() {
  const { getSystemSettings } = useGetSystemSettings();
  const { data: getAirDropRes } = useGetAirDropActiveEventQuery();
  const getAirDropData = getAirDropRes?.data;
  const percent = getAirDropData?.usesToinPercent ?? 0;
  const minEdge = 12;
  const maxEdge = 90;
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const isLeftEdge = clampedPercent < minEdge;
  const isRightEdge = clampedPercent > maxEdge;
  return (
    <div>
      {/* Header with ring and text */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center flex-wrap">
          <div className="w-3 h-3 flex-shrink-0 rounded-full bg-primary ring-4 ring-primary/20 mr-2 animate-pulse-ring" />
          <GradientText label="Airdrop Event" className="text-xl font-medium" />
          <span className="ml-3 text-muted text-base font-bold hidden sm:block">
            |
          </span>
          <span className="ml-3 text-default-200 text-xl font-medium">
            {getAirDropData?.totalToinAmount}
          </span>
        </div>

        {/* Info tooltip icon (optional) */}
        <Tooltip>
          <TooltipTrigger asChild>
            <WarningIcon className="text-default-100 hover:text-primary" />
          </TooltipTrigger>

          {getSystemSettings?.airdropEventMessage && (
            <TooltipContent
              side="bottom"
              align="center"
              className="bg-background border text-base w-72 translate-x-[-40px] mt-2"
              isShowArrow={false}
            >
              {getSystemSettings?.airdropEventMessage}
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-10 lg:h-12 bg-secondary rounded-sm overflow-hidden">
        {/* Filled portion */}
        <div
          className="h-full bg-primary text-black font-medium flex items-center justify-end transition-all duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
        >
          {!isLeftEdge && (
            <span className="pr-0  lg:pr-[10%] pl-2 text-xs sm:text-sm md:text-base ">
              {percent.toFixed(6)}%
            </span>
          )}
        </div>
        {isLeftEdge && (
          <div
            className={`absolute left-[12%] sm:right-4 top-1/2 -translate-y-1/2`}
          >
            {percent.toFixed(6)}%
          </div>
        )}

        {/* Trophy Icon */}
        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2">
          <Image
            src="/images/badges/badges.png"
            alt="trophy"
            height={20}
            width={22}
            className="sm:h-6 sm:w-7 md:h-8 md:w-9"
          />
        </div>
      </div>

      {/* Triangle Indicator + Current Value */}
      <div className="relative mt-2">
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${clampedPercent}%`,
            transform: "translateX(-50%)",
          }}
        >
          <ArrowUpFillIcon className="text-primary z-10" />

          {/* Value container */}
          <div
            className={`mt-1 text-lg text-center transition-all duration-300 ${
              isLeftEdge ? "hidden" : isRightEdge ? "hidden" : "translate-x-0"
            } whitespace-nowrap overflow-hidden text-ellipsis px-1`}
            style={{
              maxWidth: "100%",
            }}
          >
            {getAirDropData?.usesToinAmount}
          </div>
        </div>
        <div
          className={`absolute top-5 text-lg text-center transition-all duration-300 ${
            isLeftEdge
              ? "text-left block"
              : isRightEdge
              ? "text-right w-full block"
              : "translate-x-0 hidden"
          } whitespace-nowrap overflow-hidden text-ellipsis pl-1`}
          style={{
            maxWidth: "100%",
          }}
        >
          {getAirDropData?.usesToinAmount}
        </div>
      </div>
    </div>
  );
}

export default AirdropProgressCard;
