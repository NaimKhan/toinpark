"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";
import Calendar from "../svg/Calendar";
import LabelErrorWrapper from "../ui/LabelErrorWrapper";

type Props = {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  dateFormat?: string;
  monthsShown?: number;
  className?: string;
  showIcon?: boolean;
  isClearable?: boolean;
  required?: boolean;
  showTimeSelect?: boolean;
  minDate?: Date;
  maxDate?: Date;
  minTime?: Date;
  error?: string | number | null | boolean;
  allowSameDay?: boolean;
};

function CustomDatePicker({
  value,
  label,
  onChange,
  placeholder = "Pick a date",
  monthsShown = 1,
  className,
  showIcon = false,
  isClearable = true,
  required = false,
  showTimeSelect = false,
  minDate,
  maxDate,
  minTime,
  dateFormat,
  error,
  allowSameDay,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  useEffect(() => {
    setSelectedDate(value || null);
  }, [value]);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <>
      <LabelErrorWrapper required={required} label={label} error={error}>
        <div className="inline-block relative w-full">
          <div className="flex items-center w-full react-calender">
            <DatePicker
              icon={<Calendar className="size-5 text-muted-foreground" />}
              showIcon={showIcon}
              calendarIconClassName="mt-2!"
              selected={selectedDate}
              onChange={handleChange}
              placeholderText={placeholder}
              monthsShown={monthsShown}
              dateFormat={dateFormat}
              isClearable={isClearable}
              minDate={minDate}
              maxDate={maxDate}
              allowSameDay={allowSameDay}
              showTimeSelect={showTimeSelect}
              minTime={minTime}
              // onKeyDown={(e) => e.preventDefault()}
              className={cn(
                "w-full! text-default-100! bg-muted! text-lg! font-light! h-12! rounded-sm! border-none! outline-none! focus-visible:ring-[1px]! focus-visible:ring-ring/60!",
                className
              )}
            />
          </div>
        </div>
      </LabelErrorWrapper>
    </>
  );
}

export default CustomDatePicker;

/* 
Uses 
************ Stand alone ************
import CustomDatePicker from "@/components/common/CustomDatePicker";
import { useState } from "react";

export default function Example() {
  const [date, setDate] = useState<Date | null>(null);

  return (
      <CustomDatePicker
        value={date}
        onChange={(val) => {
          setDate(val);
          console.log("Selected date:", val);
        }}
        placeholder="Select a date"
      />
  );
}


********** Inside hook form **********
import { useForm, Controller } from "react-hook-form";
import CustomDatePicker from "@/components/common/CustomDatePicker";

export default function FormExample() {
  const { control, handleSubmit } = useForm({
    defaultValues: { date: null },
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log("Submitted:", data))}>
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <CustomDatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder="Choose a date"
          />
        )}
      />
      <button type="submit" className="mt-3 btn-primary">
        Submit
      </button>
    </form>
  );
}

*/
