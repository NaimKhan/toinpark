import { cn } from "@/lib/utils";

function ContentLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background min-h-[60vh]",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className={cn(
            "w-8 h-8 border-4 border-t-primary border-default-200 rounded-full animate-spin"
          )}
        ></div>
        <p className="text-default-200 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default ContentLoader;
