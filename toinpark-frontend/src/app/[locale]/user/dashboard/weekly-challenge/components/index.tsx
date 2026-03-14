import ClockIcon from "@/components/svg/ClockIcon";
import { Badge } from "@/components/ui/badge";
import { challenges } from "./data";
import GradientText from "@/components/feature/text/gradientText";
import ChallangeItem from "./ChallangeItem";

function WeeklyChallenge() {
  return (
    <div className="space-y-6 md:space-y-10 px-6 py-6 xl:px-16 md:px-10 md:py-12">
      {/* Header Section */}
      <div className=" w-full flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <GradientText
            label="Weekly Challenge"
            className="text-[28px] md:text-[34px] lg:text-[40px] font-semibold flex-none"
          />
          <Badge className="bg-secondary text-primary text-xs md:text-base rounded-full px-2 py-1 md:px-4 md:py-3">
            <div className="w-4 h-4 md:w-6 md:h-6">
              <ClockIcon className="w-full h-full" />
            </div>
            5 days remaining
          </Badge>
        </div>

        <p className="text-lg text-default-200 ">
          Complete simple weekly challenges and stay active on the platform. Earn extra coins by achieving challenge milestones.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {challenges.map((challenge) => (
        <ChallangeItem key={challenge.id} challenge={challenge} />
      ))}
      </div>
    </div>
  );
}

export default WeeklyChallenge;
