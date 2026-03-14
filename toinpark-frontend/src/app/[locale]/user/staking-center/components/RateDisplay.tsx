"use client";

import PageLoader from "@/components/feature/loader/ContentLoader";
import { useGetSystemSettingsQuery } from "@/store/api/system-settings/system-settings-api";
import { convertToNumber } from "js-utility-method";

export default function RateDisplay() {
  const { data: systemSettingsRes, isLoading } = useGetSystemSettingsQuery();
  const rate = systemSettingsRes?.data?.toinConventionRate ?? 0;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="bg-secondary px-6 py-6 xl:px-16 md:px-10 md:py-8 space-y-2 mb-10">
      <p className="text-2xl uppercase text-default-100">
        1 TOIN ={" "}
        {convertToNumber({
          value: rate,
          digit: 6,
          fallback: 0,
        })}{" "}
        USDT
      </p>
    </div>
  );
}
