"use client";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Calendar from "../svg/Calendar";
import { cn } from "@/lib/utils";

type Props = {
  value?: { from: Date | null; to: Date | null };
  onChange?: (range: { from: Date | null; to: Date | null }) => void;
  onApply?: (range: { from: Date; to: Date }) => void;
  onClear?: () => void;
  monthsShown?: number;
  showBtnIcon?: boolean;
  buttonLabel?: string;
  className?: string;
};

function CustomDateRangePicker({
  value,
  onChange,
  onApply,
  onClear,
  monthsShown,
  showBtnIcon,
  buttonLabel = "Custom Date",
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [appliedRange, setAppliedRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    if (value?.from || value?.to) {
      setAppliedRange([value.from, value.to]);
      setDateRange([value.from, value.to]);
    }
  }, [value]);

  const onSelectChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);

    if (onChange) {
      onChange({ from: dates[0], to: dates[1] });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
    if (!isOpen) setDateRange(appliedRange);
  };

  const handleApply = () => {
    if (dateRange[0] && dateRange[1]) {
      setAppliedRange(dateRange);
      setIsOpen(false);

      onApply?.({ from: dateRange[0], to: dateRange[1] });
      onChange?.({ from: dateRange[0], to: dateRange[1] });
    }
  };

  const handleClear = () => {
    setDateRange([null, null]);
    setAppliedRange([null, null]);
    setIsOpen(false);
    onClear?.();
    onChange?.({ from: null, to: null });
  };

  const handleCancel = () => {
    setDateRange(appliedRange);
    setIsOpen(false);
  };

  const datesAreEqual = (
    range1: [Date | null, Date | null],
    range2: [Date | null, Date | null]
  ) =>
    dayjs(range1[0]).isSame(range2[0], "day") &&
    dayjs(range1[1]).isSame(range2[1], "day");

  const getButtonLabel = () => {
    if (appliedRange[0] && appliedRange[1]) {
      return `${dayjs(appliedRange[0]).format("MMM DD, YYYY")} - ${dayjs(
        appliedRange[1]
      ).format("MMM DD, YYYY")}`;
    }
    return (
      <span className="flex items-center gap-2">
        {showBtnIcon && <Calendar className="h-4 w-4" />}
        <Calendar className="h-4 w-4" />
        {buttonLabel}
      </span>
    );
  };

  const showApply =
    dateRange[0] &&
    dateRange[1] &&
    (!appliedRange[0] ||
      !appliedRange[1] ||
      !datesAreEqual(dateRange, appliedRange));

  const showClear =
    appliedRange[0] &&
    appliedRange[1] &&
    datesAreEqual(dateRange, appliedRange);

  return (
    <div className="react-calender inline-block relative">
      <button
        className={cn(
          "example-custom-input flex items-center gap-2 text-nowrap rounded border px-3 py-2 hover:bg-secondary",
          appliedRange[0] && appliedRange[1] && "bg-background",
          className
        )}
        onClick={handleClick}
        type="button"
      >
        {getButtonLabel()}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 max-w-[800px] rounded bg-default-50 p-3 shadow bg-secondary-background">
          <DatePicker
            selected={dateRange[0]}
            onChange={onSelectChange}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            monthsShown={monthsShown || 1}
            inline
            selectsRange
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 60))}
          />

          <div className="mt-2 flex items-start flex-col justify-between gap-3">
            <div className="flex items-center justify-between gap-2 w-full">
              {dateRange[0] && (
                <Button color="secondary" type="button">
                  {dayjs(dateRange[0]).format("MMM DD, YYYY")}
                </Button>
              )}
              {dateRange[1] && (
                <div className="w-full">
                  <Separator className="min-w-4! bg-default-200" />
                </div>
              )}
              {dateRange[1] && (
                <Button color="secondary" type="button">
                  {dayjs(dateRange[1]).format("MMM DD, YYYY")}
                </Button>
              )}
            </div>

            <div className="flex flex-1 w-full justify-end gap-2">
              <Button
                color="secondary"
                className="rounded border px-3 py-1 text-sm bg-background"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </Button>

              {showClear && (
                <Button
                  color="default"
                  className="py- rounded text-sm"
                  onClick={handleClear}
                  type="button"
                >
                  Clear
                </Button>
              )}

              {!showClear && (
                <Button
                  color="secondary"
                  disabled={!showApply}
                  className="rounded text-sm"
                  onClick={handleApply}
                  type="button"
                >
                  Apply
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomDateRangePicker;

/* uses */
{
  /* 
  -------------Direct use-------------
  <CustomDatePicker
  monthsShown={2}
  buttonLabel="Pick a date"
  onApply={(range) => console.log("Selected:", range)}
/>;

 -------------Inside hook -------------
<Controller
  control={control}
  name="dateRange"
  render={({ field }) => (
    <CustomDatePicker
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>

*/
}
