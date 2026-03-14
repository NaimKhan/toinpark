"use client";
import SelectDataNotFound from "@/components/dataNotFound/SelectDataNotFound";
import InputLoader from "@/components/feature/loader/InputLoader";
import RenderData from "@/components/feature/loader/RenderData";
import SearchComponent from "@/components/ui/SearchComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetTutorialCategoriesQuery } from "@/store/api/tutorial-categories/tutorial-categories-api";

export default function TutorialsPageTools() {
  const { data: TutorialCategoriesRes, ...getTutorialCategoriesApiState } =
    useGetTutorialCategoriesQuery();
  const tutorialCategoryData = TutorialCategoriesRes?.data?.items;

  const { updateAParam, deleteAParam } = useManageSearchParams();
  return (
    <div className="flex items-center w-full md:w-auto gap-4 flex-col md:flex-row">
      <SearchComponent
        placeholder="Search Tutorials"
        className="w-full !h-12"
      />

      <RenderData
        expectedDataType="array"
        data={tutorialCategoryData}
        showEmptyState={true}
        {...getTutorialCategoriesApiState}
        loadingSkeleton={<InputLoader />}
        dataNotFoundUI={
          <SelectDataNotFound
            className="w-full !h-12"
            placeholder="No Category found"
          />
        }
      >
        <Select
          onValueChange={(value) => {
            if (value === "all") {
              deleteAParam("search");
              return;
            }
            updateAParam({ key: "search", value });
          }}
        >
          <SelectTrigger className="w-full md:w-[190px] !h-12 p-4">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>

          <SelectContent className="max-w-[350px] mr-12">
            <SelectItem value="all">All</SelectItem>
            {tutorialCategoryData?.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.name)}>
                <div className="truncate">{cat.name}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </RenderData>
    </div>
  );
}
