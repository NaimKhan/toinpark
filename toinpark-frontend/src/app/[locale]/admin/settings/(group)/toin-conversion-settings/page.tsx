import { getSeoMeta } from "@/lib/getSeoMeta";
import USDTToTOINForm from "./components/USDTToTOINForm";
import GradientText from "@/components/feature/text/gradientText";

export const metadata = getSeoMeta({ title: "TOIN Conversion Settings" });

export default function ToinConversionSettings() {
  return (
    <div>
      <div className="text-default-100 w-full flex items-center justify-between p-4 bg-border/50">
        <GradientText
          label="USDT To TOIN Rate Management"
          className="text-xl font-semibold whitespace-nowrap"
        />
      </div>

      <div className="md:p-16 p-4">
        <USDTToTOINForm />
      </div>
    </div>
  );
}
