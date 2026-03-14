"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface IGradientTextProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  label?: string;
  children?: React.ReactNode;
  type?: "primary" | "secondary";
}

function GradientText({
  label,
  children,
  className,
  asChild,
  type = "primary",
}: IGradientTextProps) {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp
      className={cn(
        "inline-block text-transparent tracking-[-0.04em] bg-clip-text bg-[radial-gradient(circle_at_50%_50%,_#FFFFFF_0%,_#FFFFFF99_100%)]",
        {
          "inline-block text-transparent bg-clip-text tracking-[-0.04em] bg-[radial-gradient(60%_429.84%_at_50.18%_50%,rgb(255_255_255/1)_0%,rgb(255_255_255/0.6)_100%)]":
            type === "secondary",
        },
        className
      )}
    >
      {children ?? label}
    </Comp>
  );
}

export default GradientText;
