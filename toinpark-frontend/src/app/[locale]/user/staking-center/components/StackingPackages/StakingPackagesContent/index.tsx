import GradientText from "@/components/feature/text/gradientText";
import TrendingUpIcon from "@/components/svg/TrendingUpIcon";
import StackingPackagesCardContent from "../StackingPackagesCardContent";

function StackingPackagesContent() {
  return (
    <div className="my-6 md:my-10 space-y-12">
      <div className=" border-b pb-6 md:pb-10">
        <div className="flex flex-wrap items-center px-6 xl:px-16 md:px-10 gap-2 text-primary text-base md:text-xl lg:text-2xl font-medium">
          <TrendingUpIcon className="w-10 h-10 md:w-12 md:h-12" />
          Stake & earn up to <span className="font-bold">55% APY</span> (0.15%
          daily)
        </div>
      </div>

      <div className="space-y-6 md:space-y-10">
        {/* Staking Packages */}
        <div className="space-y-4 px-6 xl:px-16 md:px-10 text-start">
          <GradientText
            type="secondary"
            label="Staking Packages"
            className="text-[28px] md:text-4xl lg:text-5xl pb-1 font-medium"
          />
          <p className="text-default-200 text-lg font-normal  mx-auto">
            Explore available staking packages and choose the one that fits your needs
          </p>
        </div>

        {/* Cards Section */}
        <StackingPackagesCardContent />
      </div>
    </div>
  );
}

export default StackingPackagesContent;
