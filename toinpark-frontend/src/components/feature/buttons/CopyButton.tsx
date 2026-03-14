"use client";
import { useCallback } from "react";
import toast from "react-hot-toast";

import { copyText } from "@/lib/copy-util";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ICopyButtonProps {
  text: string;
  className?: string;
  children: React.ReactNode;
  copySuccessMessage?: string;
  copyErrorMessage?: string;
  disabled?: boolean;
}

function CopyButton({
  text,
  className,
  children,
  copySuccessMessage,
  copyErrorMessage,
  disabled = false,
}: ICopyButtonProps) {
  const handleCopy = useCallback(async () => {
    if (!text) {
      return;
    }

    const wasCopied = await copyText(text);

    if (wasCopied?.success) {
      toast.success(copySuccessMessage || "Text copied to clipboard.", {
        className:
          "bg-gray-800 text-white border border-gray-700 rounded-lg shadow-lg",
        position: "top-center",
        duration: 3000,
        style: {
          background: "#1F2937",
          color: "white",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
      });
    } else {
      toast.error(copyErrorMessage || "Failed to copy text.", {
        className:
          "bg-error-500 text-white border border-error-600 rounded-lg shadow-lg",
        position: "top-center",
        duration: 3000,
        style: {
          background: "#EF4444",
          color: "white",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
      });
    }
  }, [text, copySuccessMessage, copyErrorMessage]);

  return (
    <Button
      className={cn("text-black", className)}
      onClick={handleCopy}
      variant="default"
      size="lg"
      color="default"
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default CopyButton;
