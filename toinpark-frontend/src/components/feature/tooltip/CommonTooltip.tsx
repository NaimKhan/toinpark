"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommonTooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  contentClassName?: string;
}

export default function CommonTooltip({
  children,
  content,
  side = "top",
  contentClassName,
}: CommonTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p className={contentClassName}>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
