import GradientText from "@/components/feature/text/gradientText";
import SearchComponent from "@/components/ui/SearchComponent";
import WithdrawalHistoryTable from "../WithdrawalHistoryTable";
import { useTranslations } from "next-intl";

function WithdrawalHistoryBody() {
  const t = useTranslations("Menus");
  return (
    <div className="my-6 md:my-10 space-y-12">
      <div className="space-y-6 md:space-y-10">
        <div className="flex flex-wrap items-start md:items-end justify-between gap-6 px-6 xl:px-16 md:px-10">
          <div className="space-y-2 md:space-y-4 text-start flex-1">
            <GradientText
              type="secondary"
              label={t("withdrawalHistory")}
              className="text-[28px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap pb-1"
            />
          </div>
        </div>

        <div className="space-y-8 md:space-y-10 px-6 xl:px-16 md:px-10 text-start w-full overflow-hidden">
          <WithdrawalHistoryTable />
        </div>
      </div>
    </div>
  );
}

export default WithdrawalHistoryBody;
