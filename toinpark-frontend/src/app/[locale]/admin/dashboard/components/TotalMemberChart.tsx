import ApexChart from "@/components/charts/apex-chart";
import { Card, CardTitle } from "@/components/ui/card";
import { useGetUserRegistrationGraphQuery } from "@/store/api/admin-dashboard/admin-dashboard-api";
import { Skeleton } from "@/components/ui/skeleton";

export default function TotalMemberChart() {
  const currentYear = new Date().getFullYear();
  const { data: graphRes, isLoading } = useGetUserRegistrationGraphQuery({
    startDate: `${currentYear}-01-01`,
    endDate: `${currentYear}-12-31`,
  });
  const graphData = graphRes?.data?.data || [];

  const series = [
    {
      name: "Members",
      data: graphData.map((item) => item.count),
    },
  ];

  const categories = graphData.map((item) => item.monthName.substring(0, 3));

  return (
    <Card className="bg-transparent !pt-8">
      <CardTitle className="text-primary px-5">Total Members</CardTitle>
      {isLoading ? (
        <div className="p-5">
          <Skeleton className="h-[350px] w-full rounded-xl" />
        </div>
      ) : (
        <ApexChart
          series={series}
          height={350}
          categories={categories}
          type="line"
        />
      )}
    </Card>
  );
}
