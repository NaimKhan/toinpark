"use client";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import type { ApexOptions } from "apexcharts";

import getOptions, { type IGetApexChartOptionsProps } from "./get-options";
import { IApexChartSeries } from "@/lib/charts/types";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface ApexBarChartProps extends IGetApexChartOptionsProps {
  height?: number;
  series: IApexChartSeries[];
  title?: string;
}

function ApexBarChart({
  categories,
  series,
  height = 300,
  colors = ["#4ae3c9"],
  title,
}: ApexBarChartProps) {
  const options = useMemo<ApexOptions>(
    () => getOptions({ categories, colors }),
    [categories, colors]
  );

  return (
    <>
      {title && (
        <h4 className="text-left text-default-200 text-nowrap">{title}</h4>
      )}
      <Chart
        options={options}
        series={series}
        type="bar"
        height={height}
        width="100%"
      />
    </>
  );
}

export default memo(ApexBarChart);
