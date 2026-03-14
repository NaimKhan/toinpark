"use client";
import { Eye, EyeOff } from "lucide-react";
import { Input, InputProps } from "./input";
import { useState } from "react";

function PasswordInput({ ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Input
      type={showPassword ? "text" : "password"}
      {...rest}
      rightContent={
        <span
          onClick={togglePassword}
          className="text-muted-foreground size-6 cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="size-6 " />
          ) : (
            <Eye className="size-6 " />
          )}
        </span>
      }
    />
  );
}

export default PasswordInput;
