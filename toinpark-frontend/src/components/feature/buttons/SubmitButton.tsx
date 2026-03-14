"use client";

import { memo } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InlineLoader from "../loader/InlineLoader";

type TSubmitButtonProps = {
  isLoading?: boolean;
  loadingContent?: ReactNode;
  hideLoadingContent?: boolean;
  actionContent?: ReactNode;
  className?: string;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
} & React.ComponentProps<typeof Button>;

function SubmitButton({
  isLoading = false,
  loadingContent = "Submitting...",
  hideLoadingContent = false,
  actionContent = "Submit",
  children,
  className,
  type = "submit",
  ...props
}: TSubmitButtonProps) {
  return (
    <>
      {isLoading && (
        <div
          className={cn(
            "fixed inset-0 z-[999] bg-background/5 pointer-events-auto transition-colors duration-150 "
          )}
          aria-hidden="true"
        />
      )}

      <Button
        disabled={isLoading}
        className={cn("relative flex items-center justify-center", className)}
        type={type}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <InlineLoader />
            {!hideLoadingContent && <span>{loadingContent}</span>}
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            {children ?? actionContent}
          </span>
        )}
      </Button>
    </>
  );
}

export default memo(SubmitButton);
