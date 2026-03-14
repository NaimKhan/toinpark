"use client";

import { TString } from "@/store/api/common-api-types";

interface InfoCardProps {
  label: TString;
  value?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function InfoCard({
  label,
  value,
  children,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={`rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-4 shadow-sm transition-all hover:bg-card ${className}`}
    >
      <div className="text-lg font-medium tracking-wide text-muted-foreground mb-2">
        {label}
      </div>

      <div className="text-sm font-semibold text-foreground leading-relaxed break-words">
        {children ? children : value ?? "—"}
      </div>
    </div>
  );
}
