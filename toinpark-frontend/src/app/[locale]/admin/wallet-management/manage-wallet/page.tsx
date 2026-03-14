import { getSeoMeta } from "@/lib/getSeoMeta";
import DeductFundForm from "./components/DeductFundForm";
import AddFundForm from "./components/AddFundForm";
import GradientText from "@/components/feature/text/gradientText";

export const metadata = getSeoMeta({ title: "Wallet Management" });

function ManageWallet() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 py-8 xl:px-16 md:px-12 md:py-12">
      <div>
        <div className="text-default-100 uppercase w-full flex items-center justify-between mb-6 md:mb-8">
          <GradientText
            label="Stake by Admin"
            className="text-2xl font-semibold md:whitespace-nowrap"
          />
        </div>
        <AddFundForm />
      </div>
      <div>
        <div className="text-default-100 uppercase w-full flex items-center justify-between mb-6 md:mb-8">
          <GradientText
            label="Deduct TOIN From User Staking Package"
            className="text-xl font-semibold md:whitespace-nowrap"
          />
        </div>
        <DeductFundForm />
      </div>
    </div>
  );
}

export default ManageWallet;
