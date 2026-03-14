import { memo } from "react";

import { cn } from "@/lib/utils";

interface IFooterContainerProps {
  children?: React.ReactNode;
  className?: string;
}

function FooterContainer({ children, className }: IFooterContainerProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}

export default memo(FooterContainer);
