import GradientText from "@/components/feature/text/gradientText";
import TicketResponsesTable from "./TicketResponsesTable";
import SearchComponent from "@/components/ui/SearchComponent";

function TicketResponsesContent() {
  return (
    <div className="space-y-6 md:space-y-10 px-6 xl:px-16 md:px-10">
      {/* Wallet history */}
      <div className="flex flex-wrap items-start md:items-end justify-between gap-6">
        <div className="space-y-4 text-start flex-1">
          <GradientText
            type="secondary"
            label="Ticket Responses"
            className="text-[28px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap"
          />
          <p className="text-default-200 text-lg font-normal  mx-auto">
            Chat with support and track all responses on your tickets.
          </p>
        </div>
        <div className="flex-none">
          <SearchComponent
            placeholder="Search by Ticket Info"
            className="w-full !h-12"
          />
        </div>
      </div>

      <div className="space-y-10">
        <TicketResponsesTable />
      </div>
    </div>
  );
}

export default TicketResponsesContent;
