"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface IInputOTPProps {
  containerClassName?: string;
  maxLength?: number;
  children?: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}
function InputOTP({
  children,
  className,
  containerClassName,
  maxLength = 6,
  value,
  onChange,
  disabled,
  ...props
}: IInputOTPProps) {
  return (
    <OTPInput
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...props}
    >
      {children}
    </OTPInput>
  );
}

function InputOTPGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex items-center", className)} {...props} />;
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md dark:border-default-300",
        isActive && "z-10 ring-1 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div role="separator" {...props}>
      <Dot />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
