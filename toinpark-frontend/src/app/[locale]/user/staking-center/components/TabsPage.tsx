"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCallback } from "react";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import StackingPackagesContent from "./StackingPackages/StakingPackagesContent";
import StackingHistoryBody from "./StakingHistory/StackingHistoryBody";
import WithdrawalHistoryBody from "./WithdrawalHistory/WithdrawalHistoryBody";

type TProfileTabValue = "packages" | "history" | "withdrawal";
type TProfileTabState = {
  tab?: TProfileTabValue;
};
export default function TabsPage() {
  const { getAParamValue, updateAParam } =
    useManageSearchParams<TProfileTabState>();

  const tab: TProfileTabValue = getAParamValue("tab") || "packages";

  const setTab = useCallback(
    (value: string) =>
      updateAParam({
        key: "tab",
        value: value === "packages" ? undefined : (value as TProfileTabValue),
      }),
    [updateAParam],
  );
  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full gap-0">
      <TabsList className="flex justify-center w-full border-b p-0 m-0 bg-transparent rounded-none">
        <TabsTrigger
          value="packages"
          className="relative text-lg font-medium text-default-200 data-[state=active]:text-default-100 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary pb-6 cursor-pointer"
        >
          Staking packages
        </TabsTrigger>
        <TabsTrigger
          value="history"
          className="relative text-lg font-medium text-default-200 data-[state=active]:text-default-100 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary pb-6 cursor-pointer"
        >
          Staking history
        </TabsTrigger>
        <TabsTrigger
          value="withdrawal"
          className="relative text-lg font-medium text-default-200 data-[state=active]:text-default-100 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary pb-6 cursor-pointer"
        >
          Withdrawal history
        </TabsTrigger>
      </TabsList>

      {/* Packages Content */}
      <TabsContent value="packages">
        <StackingPackagesContent />
      </TabsContent>

      {/* Staking History Content */}
      <TabsContent value="history">
        {/* <StakingHistoryContent /> */}
        <StackingHistoryBody />
      </TabsContent>

      {/* Withdrawal History Content */}
      <TabsContent value="withdrawal">
        <WithdrawalHistoryBody />
      </TabsContent>
    </Tabs>
  );
}
