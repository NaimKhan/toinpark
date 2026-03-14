"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketResponsesContent from "./TicketResponses";
import OpenTicketContent from "./OpenTicket";
import { useCallback } from "react";
import useManageSearchParams from "@/hooks/useManageSearchParams";

type TTabValue = "openTicket" | "ticketResponses";
type TTabState = {
  tab?: TTabValue;
};

export default function TabsPage() {
  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();

  const tab: TTabValue = getAParamValue("tab") || "openTicket";

  const setTab = useCallback(
    (value: string) =>
      updateAParam({
        key: "tab",
        value: value === "openTicket" ? undefined : (value as TTabValue),
      }),
    [updateAParam]
  );
  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full gap-0 py-8">
      <TabsList className="flex justify-center w-full border-b p-0 m-0 bg-transparent rounded-none">
        <TabsTrigger
          value="openTicket"
          className="relative text-lg font-medium text-default-200 data-[state=active]:text-default-100 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary pb-6 cursor-pointer"
        >
          Open A Ticket
        </TabsTrigger>
        <TabsTrigger
          value="ticketResponses"
          className="relative text-lg font-medium text-default-200 data-[state=active]:text-default-100 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary pb-6 cursor-pointer"
        >
          Ticket Responses
        </TabsTrigger>
      </TabsList>

      {/* Open Ticket Content */}
      <TabsContent value="openTicket">
        <OpenTicketContent />
      </TabsContent>

      {/* Ticket Responses Content */}
      <TabsContent
        value="ticketResponses"
        className="my-6 md:my-10 space-y-12 text-default-200"
      >
        <TicketResponsesContent />
      </TabsContent>
    </Tabs>
  );
}
