export interface IGetApexChartOptionsProps {
  categories?: string[];
  colors?: string[];
  type?: "line" | "area";
}

const getOptions = ({
  categories,
  colors,
  type = "line",
}: IGetApexChartOptionsProps): ApexCharts.ApexOptions => {
  return {
    chart: {
      type,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: { enabled: true },
    stroke: {
      curve: type === "line" ? "straight" : "smooth",
      width: 1,
    },
    colors: colors ?? ["#1570EF", "#DD2590", "#EAAA08"],
    tooltip: { theme: "dark" },
    ...(type === "area" && {
      fill: {
        type: "gradient",
        colors: colors ?? ["#FFC833"],
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.2,
          opacityTo: 0.1,
          stops: [50, 100, 0],
        },
      },
    }),

    grid: {
      borderColor: "#242b2b",
      strokeDashArray: 0,
      row: {
        colors: ["transparent"],
        opacity: 0.5,
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: ["#9f9f9f"],
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
        },
        formatter: (value: number) => `${value}`,
      },
    },
    xaxis: {
      categories: categories ?? [],
      labels: {
        style: {
          colors: "#9f9f9f",
          fontFamily: "Inter, sans-serif",
        },
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
