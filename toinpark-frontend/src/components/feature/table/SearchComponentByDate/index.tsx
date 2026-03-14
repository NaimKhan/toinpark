import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomDatePicker from "@/components/date/CustomDatePicker";
import { Button } from "@/components/ui/button";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export default function SearchComponentByDate() {
  const { getAllParamValue, updateAParam, deleteAParam } =
    useManageSearchParams();
  const { startDate: startParam, endDate: endParam } = getAllParamValue();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const parsedStartParam = startParam ? new Date(startParam as string) : null;
  const parsedEndParam = endParam ? new Date(endParam as string) : null;

  const handleSearch = () => {
    updateAParam({ key: "startDate", value: startDate?.toISOString() });
    updateAParam({ key: "endDate", value: endDate?.toISOString() });
    setOpen(false);
  };

  const handleClear = () => {
    deleteAParam("startDate");
    deleteAParam("endDate");
    setStartDate(null);
    setEndDate(null);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setStartDate(parsedStartParam);
      setEndDate(parsedEndParam);
    }
  };

  const isDateEqual = (d1: Date | null, d2: Date | null) => {
    return d1?.toISOString() === d2?.toISOString();
  };

  const isFilterActive = !!(parsedStartParam || parsedEndParam);
  const isLocalSameAsActive =
    isDateEqual(startDate, parsedStartParam) &&
    isDateEqual(endDate, parsedEndParam);
  const showClearButton = isFilterActive && isLocalSameAsActive;

  return (
    <div className="flex items-center gap-4">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-12 px-4 border-border text-default-100/70 hover:text-default-100 flex items-center gap-2"
          >
            <CalendarIcon className="w-4 h-4" />
            {parsedStartParam || parsedEndParam ? (
              <span className="text-sm">
                {parsedStartParam ? format(parsedStartParam, "MMM dd") : "..."}{" "}
                - {parsedEndParam ? format(parsedEndParam, "MMM dd") : "..."}
              </span>
            ) : (
              <span>Filter by Date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="p-5 space-y-5 w-full bg-background border-border shadow-2xl rounded-xl"
          align="end"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="space-y-4">
            <CustomDatePicker
              value={startDate}
              placeholder="Select start date"
              showIcon
              dateFormat="MMM dd, yyyy"
              onChange={(val) => setStartDate(val)}
            />

            <CustomDatePicker
              value={endDate}
              placeholder="Select end date"
              showIcon
              dateFormat="MMM dd, yyyy"
              onChange={(val) => setEndDate(val)}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={() => setOpen(false)}
              className="flex-1 h-10 text-sm font-medium"
              color="destructive"
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
            {showClearButton ? (
              <Button
                onClick={handleClear}
                className="flex-1 h-10 text-sm font-medium"
                variant="outline"
              >
                Clear
              </Button>
            ) : (
              <Button
                onClick={handleSearch}
                className="flex-1 h-10 text-sm font-medium"
              >
                Apply
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
