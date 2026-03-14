import GradientText from "@/components/feature/text/gradientText";
import { getSeoMeta } from "@/lib/getSeoMeta";
import ReferralIncomeTable from "../components/referral-income/ReferralIncomeTable";
import SearchComponent from "@/components/ui/SearchComponent";
import ReferralIncomeTitle from "./ReferralIncomeTitle";
import ReferralBonus from "./ReferralBonus";
export const metadata = getSeoMeta({ title: "Referral Income" });

function ReferralIncome() {
  return (
    <div className="space-y-6 md:space-y-10">
      {/* Wallet history */}

      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        <ReferralIncomeTitle />

        <ReferralBonus />
      </div>
      {/* Table and search */}
      <div className="px-6 xl:px-16 md:px-10 space-y-6">
        <div className="flex flex-wrap items-start lg:items-center justify-between w-full gap-6">
          <div className="flex-1 space-y-3 text-left w-full lg:w-auto">
            <GradientText
              type="secondary"
              label="Referral Income"
              className="text-[26px] sm:text-[32px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap"
            />
            <p className="text-default-200 text-base sm:text-lg font-normal max-w-xl">
              See your referral income broken down by each individual user.
            </p>
          </div>

          <div className="flex-none">
            <SearchComponent placeholder="Search" className="w-full !h-12" />
          </div>
        </div>

        <div className="space-y-8 md:space-y-10">
          <ReferralIncomeTable />
        </div>
      </div>
    </div>
  );
}

export default ReferralIncome;
