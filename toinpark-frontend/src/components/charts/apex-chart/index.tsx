"use client";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import type { ApexOptions } from "apexcharts";

import getOptions, { type IGetApexChartOptionsProps } from "./get-options";
import { IApexChartSeries } from "@/lib/charts/types";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface ApexChartProps extends IGetApexChartOptionsProps {
  height?: number;
  series: IApexChartSeries[];
}

function ApexChart({
  categories,
  series,
  height = 300,
  colors = ["#4ae3c9"],
  type = "line",
}: ApexChartProps) {
  const options = useMemo<ApexOptions>(
    () => getOptions({ categories, colors, type }),
    [categories, colors, type]
  );

  return (
    <Chart options={options} series={series} height={height} width="100%" />
  );
}

export default memo(ApexChart);
