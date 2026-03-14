import * as React from "react";
import LabelErrorWrapper, {
  type ILabelErrorWrapperProps,
} from "./LabelErrorWrapper";
import { cn } from "@/lib/utils";
export interface InputProps
  extends React.ComponentProps<"input">,
    ILabelErrorWrapperProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  inputWrapperClassName?: string;
}

function Input({
  className,
  type,
  label,
  labelClassName,
  errorClassName,
  error,
  id,
  required,
  leftContent,
  rightContent,
  inputWrapperClassName,
  ...props
}: InputProps) {
  return (
    <LabelErrorWrapper
      label={label}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      error={error}
      htmlFor={id}
      required={required}
    >
      <div className={cn("relative w-full flex-1", inputWrapperClassName)}>
        {!!leftContent && (
          <span className="absolute top-1/2 -translate-y-1/2 start-4">
            {leftContent}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-default-200 selection:bg-muted selection:text-primary-foreground dark:bg-input/30 border h-16 w-full min-w-0 rounded-sm bg-muted px-6 text-default-100 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-muted file:text-md file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-lg",
            "focus-visible:border-ring/60 transition-all duration-200 selection:bg-primary",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            { "border-destructive focus-visible:border-destructive": !!error },
            { "pl-10": !!leftContent },
            { "pr-10": !!rightContent },
            className
          )}
          id={id}
          aria-invalid={!!error}
          required={required}
          {...props}
        />
        {!!rightContent && (
          <span className="absolute top-1/2 -translate-y-1/2 end-4">
            {rightContent}
          </span>
        )}
      </div>
    </LabelErrorWrapper>
  );
}

export { Input };
