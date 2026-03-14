import GradientText from "@/components/feature/text/gradientText";
import TOINWalletHistoryTable from "../TOINWalletHistoryTable";
import SearchComponent from "@/components/ui/SearchComponent";

function TOINWalletHistoryTabContent() {
  return (
    <div className="space-y-6 md:space-y-10 px-6 xl:px-16 md:px-10">
      <div className="flex flex-wrap items-end gap-6 w-full ">
        <div className="space-y-4 flex-1 text-start">
          <GradientText
            type="secondary"
            label="TOIN Wallet History"
            className="text-[28px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap pb-1"
          />
          <p className="text-default-200 text-lg font-normal  mx-auto">
            View all your TOIN wallet activities and track balance changes over time.
          </p>
        </div>
        <div className="flex-none">
          <SearchComponent placeholder="Search" className="w-full !h-12" />
        </div>
      </div>
      <div className="space-y-8 md:space-y-10">
        <TOINWalletHistoryTable />
      </div>
    </div>
  );
}

export default TOINWalletHistoryTabContent;
