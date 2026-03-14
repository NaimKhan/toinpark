"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ErrorMessage, ILabelErrorWrapperProps } from "./LabelErrorWrapper";
import { Label } from "./label";
interface ICheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    ILabelErrorWrapperProps {
  position?: "left" | "right" | "column";
}

function Checkbox({
  className,
  label,
  error,
  id,
  required,
  labelClassName,
  errorClassName,
  position = "left",
  ...props
}: ICheckboxProps) {
  return (
    <div>
      <div
        className={cn("flex items-center gap-2", {
          "flex-row-reverse items-end": position === "right",
          "flex-col items-start": position === "column",
        })}
      >
        <CheckboxPrimitive.Root
          data-slot="checkbox"
          className={cn(
            "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          id={id}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-current transition-none"
          >
            <CheckIcon className="size-3.5" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {!!label && (
          <Label
            htmlFor={id}
            className={cn(
              "inline-flex items-center gap-0.5 mb-0",
              labelClassName
            )}
          >
            {label}
            {!!required && <span className="text-destructive">*</span>}
          </Label>
        )}
      </div>
      <ErrorMessage error={error} errorClassName={errorClassName} />
    </div>
  );
}

export { Checkbox };
