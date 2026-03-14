"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CellContext } from "@tanstack/react-table";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}

interface AdaptiveHintProps {
  trigger: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

function AdaptiveHint({ trigger, content, className }: AdaptiveHintProps) {
  const isTouch = useIsTouchDevice();

  if (!content) return <>{trigger}</>;

  // Mobile → Popover
  if (isTouch) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent side="top" align="center" className={className}>
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  // Desktop → Tooltip
  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent
        side="top"
        align="center"
        isShowArrow={false}
        className={className}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

/* ----------------------------------
   Table Cell Component
----------------------------------- */
export function TextHintCell<TData, K extends keyof TData>({
  row: { original },
  accessorKey,
}: CellContext<TData, unknown> & {
  accessorKey: K;
}) {
  const value = original[accessorKey] as unknown as string | undefined;

  return (
    <AdaptiveHint
      trigger={
        <span className="max-w-[200px] line-clamp-1 truncate cursor-pointer">
          {value || "-"}
        </span>
      }
      content={value}
      className="bg-background border text-base w-[80vw] md:w-[50vw] mt-2"
    />
  );
}
