import GradientText from "@/components/feature/text/gradientText";
import StackingHistoryTable from "../StackingHistoryTable";
import SearchComponent from "@/components/ui/SearchComponent";
import { useGetUserToinsSummeryQuery } from "@/store/api/user-dashboard/user-dashboard-api";

function StackingHistoryBody() {
  const { data: userProfileRes } = useGetUserToinsSummeryQuery();

  const userProfileData = userProfileRes?.data;

  const balance = userProfileData?.totalStaking ?? 0;
  return (
    <div className="my-6 md:my-10 space-y-12">
      <div className=" border-b pb-6 md:pb-10 px-6 xl:px-16 md:px-10 ">
        <div className="flex md:flex-row items-center gap-2 text-primary text-base md:text-xl lg:text-2xl font-medium">
          <div className="flex items-center ">
            <div className="w-3 h-3 flex-shrink-0 rounded-full bg-primary ring-4 ring-primary/20 mr-2 animate-pulse-ring" />
            <GradientText
              type="secondary"
              label="Total Staking"
              className="text-base md:text-xl font-medium"
            />
          </div>
        </div>
        <div className="text-default-200 text-[28px] md:text-4xl lg:text-5xl mt-2 md:mt-4 font-medium">
          {balance} TOIN
        </div>
      </div>

      <div className="space-y-6 md:space-y-10">
        {/* Staking Packages */}
        <div className="flex flex-wrap items-start md:items-end justify-between gap-6 px-6 xl:px-16 md:px-10">
          <div className="space-y-2 md:space-y-4 text-start flex-1">
            <GradientText
              type="secondary"
              label="Staking history"
              className="text-[28px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap pb-1"
            />
            <p className="text-default-200 text-lg font-normal  mx-auto">
              You can withdraw your principal USDT balance after 10 days.
            </p>
          </div>
          <div className="flex-none">
            <SearchComponent placeholder="Search" className="w-full !h-12" />
          </div>
        </div>

        <div className="space-y-8 md:space-y-10 px-6 xl:px-16 md:px-10 text-start w-full overflow-hidden">
          <StackingHistoryTable />
        </div>
      </div>
    </div>
  );
}

export default StackingHistoryBody;
