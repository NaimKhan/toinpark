import Image from "next/image";
import { cn } from "@/lib/utils";

interface INoDataFoundProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  wrapperClassName?: string;
}

function NoDataFound({
  title,
  description,
  className,
  wrapperClassName,
}: INoDataFoundProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center py-16 px-4 text-center space-y-6",
        wrapperClassName
      )}
    >
      <div
        className={cn(
          "relative w-72 h-64 sm:w-96 sm:h-80 animate-fade-in",
          className
        )}
      >
        <Image
          src="/images/data-fetch/no-data-found.png"
          alt="No Data Found"
          fill
          className="object-contain opacity-90"
          priority
        />
      </div>

      <div className="space-y-2 max-w-md">
        <h4 className="text-2xl font-semibold text-foreground/90 dark:text-default-100">
          {title}
        </h4>
        <p className="text-default-200 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default NoDataFound;
