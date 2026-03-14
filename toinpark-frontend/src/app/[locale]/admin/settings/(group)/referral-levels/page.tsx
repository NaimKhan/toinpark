import { getSeoMeta } from "@/lib/getSeoMeta";
import GradientText from "@/components/feature/text/gradientText";
import RepeatUpForm from "./components/RepeatUpForm";

export const metadata = getSeoMeta({ title: "Referral Levels" });

export default function ReferralLevels() {
  return (
    <div>
      <div className="text-default-100 w-full flex items-center justify-between p-4 bg-border/50">
        <GradientText
          label="Level Commission Setting"
          className="text-xl font-semibold whitespace-nowrap"
        />
      </div>
      {/* Table */}
      <div className="p-4 md:p-10">
        <RepeatUpForm />
      </div>
    </div>
  );
}
