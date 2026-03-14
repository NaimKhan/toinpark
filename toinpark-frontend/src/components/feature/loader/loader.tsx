import { cn } from "@/lib/utils";

function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-[9999] min-h-[100vh] flex justify-center items-center w-full h-full bg-background backdrop-blur-3xl pointer-events-auto",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className={cn(
            "w-8 h-8 border-4 border-t-primary border-default-200 rounded-full animate-spin"
          )}
        ></div>
        <p className="text-default-200 text-lg font-medium ">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
