import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

interface PaginationContentProps extends React.ComponentProps<"ul"> {
  variant?: "outline" | "ghost";
}

function PaginationContent({
  className,
  variant,
  ...props
}: PaginationContentProps) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

interface PaginationButtonProps extends React.ComponentProps<typeof Button> {
  isActive?: boolean;
}

function PaginationButton({
  className,
  isActive,
  ...props
}: PaginationButtonProps) {
  return (
    <Button
      data-slot="pagination-button"
      variant="outline"
      size="icon"
      className={cn("gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

interface PaginationLinkProps extends React.ComponentProps<"a"> {
  isActive?: boolean;
  variant?: "outline" | "ghost";
  size?: "icon" | "default";
}

function PaginationLink({
  className,
  isActive,
  variant,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

interface PaginationButtonPreviousProps
  extends React.ComponentProps<typeof PaginationLink> {
  disabled?: boolean;
  variant?: "outline" | "ghost";
  isLeftRounded?: boolean;
}

function PaginationButtonPrevious({
  className,
  variant,
  disabled,
  isActive,
  isLeftRounded,
  ...props
}: PaginationButtonPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      variant={variant}
      isActive={isActive}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

interface PaginationNextProps
  extends React.ComponentProps<typeof PaginationLink> {
  disabled?: boolean;
  variant?: "outline" | "ghost";
  isRightRounded?: boolean;
}

function PaginationButtonNext({
  className,
  variant,
  disabled,
  isActive,
  isRightRounded,
  ...props
}: PaginationNextProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      variant={variant}
      isActive={isActive}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationButtonPrevious,
  PaginationButtonNext,
  PaginationEllipsis,
  PaginationButton,
};
