import * as React from "react";

import { cn } from "@/lib/utils";
import LabelErrorWrapper, {
  ILabelErrorWrapperProps,
} from "./LabelErrorWrapper";

interface ITextareaProps
  extends React.ComponentProps<"textarea">,
    ILabelErrorWrapperProps {}
function Textarea({
  className,
  label,
  labelClassName,
  errorClassName,
  error,
  id,
  required,
  ...props
}: ITextareaProps) {
  return (
    <LabelErrorWrapper
      label={label}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      error={error}
      htmlFor={id}
      required={required}
    >
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input focus-visible:border-ring/60 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-20 w-full rounded-md border py-2 text-base shadow-xs disabled:cursor-not-allowed file:text-foreground placeholder:text-default-200 selection:bg-muted selection:text-primary-foreground min-w-0 bg-muted px-6 text-default-100 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-muted file:text-md file:font-medium disabled:pointer-events-none disabled:opacity-50 md:text-lg",
          { "border-destructive focus-visible:border-destructive": !!error },
          className
        )}
        {...props}
      />
    </LabelErrorWrapper>
  );
}

export { Textarea };
