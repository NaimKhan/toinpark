import { Separator } from "@/components/ui/separator";
import { getSeoMeta } from "@/lib/getSeoMeta";
import LeaderBoard from "./components/LeaderBoard";
import InvitesClaimed from "./components/InvitesClaimed";
import ReferralLink from "./components/ReferralLink";
import { clientEnv } from "@/config/clientEnv";
export const metadata = getSeoMeta({ title: "Invite & Earn" });

function InviteAndEarnPage() {
  const siteLink = clientEnv.WEB_BASE_URL;
  return (
    <div className="bg-background text-white min-h-screen">
      <div className="grid grid-cols-1 xl:grid-cols-2 ">
        <ReferralLink siteLink={siteLink} />
        <InvitesClaimed />
      </div>
      <Separator className="bg-input" />
      <LeaderBoard />
    </div>
  );
}

export default InviteAndEarnPage;
