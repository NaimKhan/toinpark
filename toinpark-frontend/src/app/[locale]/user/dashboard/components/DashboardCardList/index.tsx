import DashboardCard from "./DashboardCard";

function DashboardCardList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <DashboardCard
        linkHref="./dashboard/invite-earn"
        imageSrc="/images/all/dashboard_card_1.png"
        title="Invite & Earn"
        excerpt="Invite friends using your referral link and grow your network. Earn bonus coins every time your referrals join and stake."
      />
      <DashboardCard
        linkHref="./dashboard/weekly-challenge"
        imageSrc="/images/all/dashboard_card_2.png"
        title="Weekly Challenge"
        excerpt="Complete simple weekly challenges and stay active on the platform. Earn extra coins by achieving challenge milestones."
      />
      <DashboardCard
        linkHref="./dashboard/community-events"
        imageSrc="/images/all/dashboard_card_3.png"
        title="Community Events"
        excerpt="Explore ongoing community events and special campaigns. Stay connected and take part in platform activities."
      />
    </div>
  );
}

export default DashboardCardList;
