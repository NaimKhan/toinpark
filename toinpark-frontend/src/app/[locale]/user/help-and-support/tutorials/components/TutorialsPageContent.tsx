"use client";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetFeatureTutorialsQuery } from "@/store/api/tutorials/tutorials-api";
import { TGetTutorialsArgs } from "@/store/api/tutorials/tutorials.types";
import TutorialCard from "./TutorialCard";
import RenderData from "@/components/feature/loader/RenderData";
import Loader from "@/components/feature/loader/loader";
import { Button } from "@/components/ui/button";

export default function TutorialsPageContent() {
  const { getAllParamValue, updateAParam } =
    useManageSearchParams<Exclude<TGetTutorialsArgs, void>>();

  const { search, limit = 6 } = getAllParamValue() as {
    search?: string;
    limit?: number;
  };

  const { data: TutorialsRes, ...getTutorialsApiState } =
    useGetFeatureTutorialsQuery({
      search,
      limit,
    });

  const TutorialsData = TutorialsRes?.data?.items || [];
  const meta = TutorialsRes?.data?.meta;

  const DEFAULT_LIMIT = 6;
  const hasNext = meta?.hasNext ?? false;
  const isExpanded = Number(limit) > DEFAULT_LIMIT;

  const handleToggleLimit = () => {
    if (hasNext) {
      const newLimit = Number(limit) + 6;
      updateAParam({ key: "limit", value: newLimit });
    } else if (isExpanded) {
      updateAParam({ key: "limit", value: undefined });
    }
  };

  return (
    <RenderData
      expectedDataType="array"
      data={TutorialsData}
      showEmptyState={true}
      {...getTutorialsApiState}
      loadingSkeleton={<Loader />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-5 md:pb-0">
        {TutorialsData.map((item) => (
          <TutorialCard key={item.id} tutorialsData={item} />
        ))}
      </div>

      {(hasNext || isExpanded) && (
        <div className="flex items-center justify-center mt-8">
          <Button
            variant="default"
            onClick={handleToggleLimit}
            className="bg-muted text-default-200 hover:text-default-900 px-10"
          >
            {hasNext ? "See More" : "See Less"}
          </Button>
        </div>
      )}
    </RenderData>
  );
}
