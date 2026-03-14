"use client";

import { ReactNode } from "react";
import { InputProps } from "./input";
import { cn } from "@/lib/utils";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LabelErrorWrapper, {
  ILabelErrorWrapperProps,
} from "./LabelErrorWrapper";

interface IPhoneInputProps
  extends
    Partial<PhoneInputProps>,
    Pick<InputProps, "className">,
    ILabelErrorWrapperProps {
  initialCountry?: string; // e.g., "bd", "us"
  inputClassName?: string;
  className?: string;
  inputProps?: InputProps;
  rightContent?: ReactNode;
  readOnly?: boolean;
}

function PhoneInputComponent({
  initialCountry = "bd",
  className,
  inputClassName,
  label,
  labelClassName,
  error,
  errorClassName,
  required,
  rightContent,
  readOnly,
  inputProps,
  ...props
}: IPhoneInputProps) {
  return (
    <div className={cn("w-full", className)}>
      <LabelErrorWrapper
        label={label}
        labelClassName={labelClassName}
        error={error}
        errorClassName={errorClassName}
        required={required}
      >
        <div className="relative w-full">
          <PhoneInput
            country={initialCountry}
            inputClass={cn(
              "!w-full !bg-input !text-default-100",
              inputClassName,
            )}
            {...props}
            inputProps={{
              readOnly,
              ...inputProps,
            }}
          />
          {rightContent && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightContent}
            </div>
          )}
        </div>
      </LabelErrorWrapper>{" "}
    </div>
  );
}

export default PhoneInputComponent;
