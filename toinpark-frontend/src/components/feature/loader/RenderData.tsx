"use client";

import { memo } from "react";
import TopLoadingBar from "./TopLoadingBar";
import DataNotFound from "@/components/ui/DataNotFound";
import Loader from "./loader";

export interface IRenderDataProps<T> {
  data?: T | null | undefined;
  isLoading?: boolean;
  isFetching?: boolean;
  loadingSkeleton?: React.ReactNode;
  dataNotFoundUI?: React.ReactNode;
  isModal?: boolean;
  dataNotFoundTitle?: string;
  dataNotFoundSubtitle?: string;
  expectedDataType: "array" | "object" | "string" | "number";
  showEmptyState?: boolean;
  emptyState?: React.ReactNode;
  children?: React.ReactNode;
}

function RenderData<T>({
  data,
  isLoading,
  isFetching,
  loadingSkeleton,
  children,
  expectedDataType,
  isModal,
  dataNotFoundUI,
  emptyState,
  showEmptyState = false,
  dataNotFoundTitle = "No data found",
  dataNotFoundSubtitle = "Sorry, we could not find any data.",
}: IRenderDataProps<T>) {
  if (isLoading) {
    return loadingSkeleton || <Loader />;
  }

  if (isFetching) {
    return (
      <>
        <TopLoadingBar isLoading={isFetching} />
        {/*  <Loader /> */}
        {!isModal && children}
      </>
    );
  }

  const isNullish = data == null;
  const isArray = Array.isArray(data);
  const isEmptyArray = isArray && data.length === 0;
  const isObject =
    typeof data === "object" &&
    !isArray &&
    data !== null &&
    Object.keys(data).length === 0;

  if (
    showEmptyState &&
    (isNullish ||
      (expectedDataType === "array" && isEmptyArray) ||
      (expectedDataType === "object" && isObject))
  ) {
    return (
      emptyState ||
      dataNotFoundUI || (
        <DataNotFound
          className="h-full grow justify-center"
          title={dataNotFoundTitle}
          subtitle={dataNotFoundSubtitle}
        />
      )
    );
  }

  return <>{children}</>;
}

export default memo(RenderData);
