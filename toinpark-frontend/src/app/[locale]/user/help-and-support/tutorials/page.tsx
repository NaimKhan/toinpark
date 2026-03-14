import GradientText from "@/components/feature/text/gradientText";
import { getSeoMeta } from "@/lib/getSeoMeta";
import TutorialsPageContent from "./components/TutorialsPageContent";
import TutorialsPageTools from "./components/TutorialsPageTools";
export const metadata = getSeoMeta({ title: "Tutorials" });

function Tutorials() {
  return (
    <div className="space-y-6 md:space-y-10 px-6 xl:px-16 md:px-10 mt-6 md:mt-12">
      {/* Wallet history */}
      <div className="flex flex-wrap items-start md:items-end justify-between gap-6">
        <div className="space-y-4 text-start flex-1">
          <GradientText
            type="secondary"
            label="Tutorials"
            className="text-[28px] md:text-4xl lg:text-5xl font-medium whitespace-nowrap"
          />
          <p className="text-default-200 text-lg font-normal  mx-auto">
            Access guides and tutorials to help you navigate and use the platform effectively.
          </p>
        </div>
        <TutorialsPageTools />
      </div>
      <TutorialsPageContent />
    </div>
  );
}

export default Tutorials;
