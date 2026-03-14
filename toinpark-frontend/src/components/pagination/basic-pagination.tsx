"use client";
import { memo, useCallback, useMemo } from "react";

import useManageSearchParams, {
  type TUseManageSearchParamsReturnType,
} from "@/hooks/useManageSearchParams";
import {
  generatePagination,
  type TGeneratePaginationProps,
} from "@/lib/pagination/generate-pagination";
import type { TPaginationArgs } from "@/store/api/common-api-types";
import {
  Pagination,
  PaginationButton,
  PaginationButtonNext,
  PaginationButtonPrevious,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface IBasicPaginationProps
  extends Exclude<TGeneratePaginationProps, null | undefined | void> {
  onPageChange?: (page: number) => void;
  disableUrlState?: boolean;
  isLoading?: boolean;
  hideForTotalPagesOne?: boolean;
  hasNext?: boolean;
  hasPrevious?: boolean;
  className?: string;
}

function BasicPagination({
  currentPage = 1,
  totalPages = 1,
  siblingCount = 1,
  hasNext,
  hasPrevious,
  onPageChange,
  disableUrlState,
  isLoading,
  hideForTotalPagesOne = true,
  className,
}: IBasicPaginationProps) {
  const { getAParamValue, updateAParam } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();

  const finalCurrentPage = disableUrlState
    ? currentPage
    : Number(getAParamValue("page") || 1);

  const { generatedPagination } = useMemo(
    () =>
      generatePagination({
        currentPage: finalCurrentPage,
        totalPages,
        siblingCount,
      }),
    [finalCurrentPage, totalPages, siblingCount]
  );

  const handlePageChange = useCallback(
    ({
        onPageChange,
        pageNumber,
        updateAParam,
        disableUrlState,
      }: Pick<IBasicPaginationProps, "onPageChange" | "disableUrlState"> & {
        pageNumber: number;
        updateAParam: TUseManageSearchParamsReturnType<
          Exclude<TPaginationArgs, void | undefined>
        >["updateAParam"];
        isPageChangeDisabled: boolean;
      }) =>
      () => {
        if (!disableUrlState) {
          if (pageNumber > 1) {
            updateAParam({
              key: "page",
              value: pageNumber,
            });
            return;
          }

          updateAParam({
            key: "page",
            value: undefined,
          });

          updateAParam({
            key: "pageSize",
            value: undefined,
          });
        }

        onPageChange?.(pageNumber);
      },
    []
  );

  if ((hideForTotalPagesOne && totalPages === 1) || !totalPages) {
    return null;
  }
  return (
    <div className={cn("w-full p-5", className)}>
      <Pagination>
        <PaginationContent className="w-full flex items-center justify-between">
          <PaginationItem>
            <p className="text-lg font-medium tracking-[-4%] text-default-200">
              Showing page {finalCurrentPage} of {totalPages}
            </p>
          </PaginationItem>

          <PaginationItem className="flex gap-4">
            {totalPages !== 1 && (
              <PaginationButtonPrevious
                disabled={!hasPrevious || !!isLoading}
                variant="outline"
                onClick={
                  hasPrevious && !isLoading
                    ? handlePageChange({
                        disableUrlState,
                        updateAParam,
                        onPageChange,
                        pageNumber: finalCurrentPage ? finalCurrentPage - 1 : 0,
                        isPageChangeDisabled: !hasPrevious || !!isLoading,
                      })
                    : undefined
                }
                className={cn("transition-colors", {
                  "bg-primary hover:bg-primary/80": hasPrevious && !isLoading,
                  "bg-primary/40 pointer-events-none":
                    !hasPrevious || isLoading,
                })}
              />
            )}

            {totalPages !== 1 && (
              <PaginationButtonNext
                disabled={!hasNext || !!isLoading}
                onClick={
                  hasNext && !isLoading
                    ? handlePageChange({
                        onPageChange,
                        pageNumber: finalCurrentPage ? finalCurrentPage + 1 : 0,
                        updateAParam,
                        disableUrlState,
                        isPageChangeDisabled: !hasNext || !!isLoading,
                      })
                    : undefined
                }
                className={cn("transition-colors", {
                  "bg-primary hover:bg-primary/80": hasNext && !isLoading,
                  "bg-primary/40 pointer-events-none": !hasNext || isLoading,
                })}
              />
            )}
          </PaginationItem>

          <PaginationItem>
            <PaginationContent>
              {generatedPagination?.map((item, index) => {
                switch (item.type) {
                  case "page": {
                    return (
                      <PaginationItem key={`${index}-page`}>
                        <PaginationButton
                          isActive={finalCurrentPage === item.page}
                          onClick={handlePageChange({
                            onPageChange,
                            updateAParam,
                            pageNumber: item.page,
                            disableUrlState,
                            isPageChangeDisabled: item?.disabled,
                          })}
                          disabled={!!isLoading}
                        >
                          {item.page}
                        </PaginationButton>
                      </PaginationItem>
                    );
                  }

                  case "ellipsis": {
                    return (
                      <PaginationItem key={`${index}-ellipsis`}>
                        <PaginationButton
                          disabled={item?.disabled || !!isLoading}
                        >
                          ...
                        </PaginationButton>
                      </PaginationItem>
                    );
                  }

                  default:
                    return null;
                }
              })}
            </PaginationContent>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default memo(BasicPagination);
