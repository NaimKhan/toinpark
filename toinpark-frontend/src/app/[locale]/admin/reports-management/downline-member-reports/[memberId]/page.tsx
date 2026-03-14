import { getSeoMeta } from "@/lib/getSeoMeta";
import DownlineMemberTeamTable from "../components/DownlineMemberTeamTable";
import GradientText from "@/components/feature/text/gradientText";

export const metadata = getSeoMeta({ title: "Downline Member Team" });

export default async function DownlineMemberTeamPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;

  return (
    <div className="px-6 md:px-12 xl:px-16 py-8 md:py-12">
      <div className="text-default-100 uppercase w-full flex items-center justify-between mb-6 md:mb-8 lg:mb-12">
        <GradientText
          label="Downline Member Team"
          className="text-2xl font-semibold md:whitespace-nowrap"
        />
      </div>
      <DownlineMemberTeamTable memberId={memberId} />
    </div>
  );
}
