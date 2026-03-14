"use client";

import { Calendar, DollarSign, Gift, User } from "lucide-react";
import DashboardStatCard from "./dashboard/components/DashboardStatCard";
import EarningsAndWithdrawalsCard from "./dashboard/components/EarningsAndWithdrawalsCard";
import TeamPerformance from "./dashboard/components/TeamPerformance";
import TotalMemberChart from "./dashboard/components/TotalMemberChart";
import ApexBarChart from "@/components/charts/apex-bar-chart";
import UserInfo from "./Components/UserInfo";
import { useGetAdminDashboardStatsQuery } from "@/store/api/admin-dashboard/admin-dashboard-api";
import { Skeleton } from "@/components/ui/skeleton";

function AdminPage() {
  const { data: statsRes, isLoading } = useGetAdminDashboardStatsQuery();
  const stats = statsRes?.data;

  return (
    <div>
      <div className="p-5 mx-8 md:mx-12 xl:mx-16 mt-10 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-5 gap-4 bg-border">
        <UserInfo />
        {/* <div className="bg-background rounded-lg p-4 ">
          <ApexBarChart
            series={[
              {
                name: "",
                data: [102, 109, 90, 120, 99, 110, 80, 87, 50, 65, 74],
              },
            ]}
            height={120}
            title="Today Register ( 0 )"
          />
        </div>
        <div className="bg-background rounded-lg p-4 ">
          <ApexBarChart
            series={[
              {
                name: "",
                data: [102, 109, 90, 120, 99, 110, 80, 87, 50, 65, 74],
              },
            ]}
            height={120}
            title="This Week Register ( 0 )"
          />
        </div>
        <div className="bg-background rounded-lg p-4 ">
          <ApexBarChart
            series={[
              {
                name: "",
                data: [87, 109, 111, 95, 120, 99, 87, 100, 67, 75, 65, 87],
              },
            ]}
            height={120}
            title="This Month Register ( 0 )"
          />
        </div>
        <div className="bg-background rounded-lg p-4 ">
          <ApexBarChart
            series={[
              {
                name: "",
                data: [87, 109, 111, 95, 120, 99, 87, 100, 67, 75, 65, 87],
              },
            ]}
            height={120}
            title="This Year Register ( 633 )"
          />
        </div> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 py-8 xl:px-16 md:px-12">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
            ))}
          </>
        ) : (
          <>
            <DashboardStatCard
              title="Total Registered User"
              value={stats?.totalRegisteredUsers ?? 0}
              subtitle="user"
              icon={User}
              total="0 User Register Today"
            />
            <DashboardStatCard
              title="Total Investment"
              value={stats?.totalInvestmentAmount.usdtAmount ?? 0}
              subtitle="Amount"
              icon={DollarSign}
              total="0 generated today"
            />
            <DashboardStatCard
              title="Level Income"
              value={stats?.levelIncome.toinAmount ?? 0}
              subtitle="Distribute"
              icon={Gift}
              total="0 distribute today"
            />
            <DashboardStatCard
              title="Total Investment"
              value={stats?.totalWithdrawalAmount.approved ?? 0}
              subtitle="Withdrawal"
              icon={DollarSign}
              total="0 paid today"
            />
          </>
        )}
      </div>
      <div className="px-6 py-8 xl:px-16 md:px-12">
        <TotalMemberChart />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 px-6 py-8 xl:px-16 md:px-12">
        <EarningsAndWithdrawalsCard />
        <TeamPerformance />
      </div>
    </div>
  );
}

export default AdminPage;
