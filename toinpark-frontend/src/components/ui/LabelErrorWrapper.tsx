import { memo } from "react";

import { cn } from "@/lib/utils";

import { Label } from "./label";

export interface ILabelErrorWrapperProps {
  label?: React.ReactNode;
  error?: string | number | null | boolean;
  htmlFor?: string;
  children?: React.ReactNode;
  labelClassName?: string;
  wrapperClassName?: string;
  errorClassName?: string;
  required?: boolean;
}
export function ErrorMessage({
  error,
  errorClassName,
}: {
  error: string | number | null | boolean | undefined;
  errorClassName?: string;
}) {
  if (!error) {
    return null;
  }
  return (
    <p className={cn("mt-1.5 text-sm text-destructive", errorClassName)}>
      {error}
    </p>
  );
}
function LabelErrorWrapper({
  label,
  labelClassName,
  errorClassName,
  wrapperClassName,
  error,
  children,
  htmlFor,
  required,
}: ILabelErrorWrapperProps) {
  return (
    <div className={cn("w-full", wrapperClassName)}>
      {!!label && (
        <Label
          htmlFor={htmlFor}
          className={cn("inline-flex items-center gap-0.5", labelClassName)}
        >
          {label}
          {!!required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {children}
      <ErrorMessage error={error} errorClassName={errorClassName} />
    </div>
  );
}

export default memo(LabelErrorWrapper);
