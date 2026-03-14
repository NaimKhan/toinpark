import { ApexOptions } from "apexcharts";

export interface IGetApexChartOptionsProps {
  categories?: string[];
  colors?: string[];
}

const getOptions = ({
  categories,
  colors,
}: IGetApexChartOptionsProps): ApexOptions => {
  return {
    chart: {
      type: "bar",
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 1,
    },
    colors: colors ?? ["#1570EF", "#DD2590", "#EAAA08"],
    tooltip: { theme: "dark" },

    grid: {
      show: false,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      categories: categories ?? [],
      labels: {
        show: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#94969C" },
      markers: {
        size: 4,
        strokeWidth: 0,
        offsetX: -5,
      },
      itemMargin: { horizontal: 12 },
      fontFamily: "Inter, sans-serif",
    },
  };
};

export default getOptions;
