import { cn } from "@/lib/utils";

type TInlineLoaderProps = {
  className?: string;
};

export default function InlineLoader({ className }: TInlineLoaderProps) {
  return (
    <div
      className={cn(
        "w-4 h-4 border-2 border-t-primary border-default-300 rounded-full animate-spin",
        className
      )}
    />
  );
}
