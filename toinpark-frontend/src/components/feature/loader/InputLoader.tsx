import LoadingIcon from "@/components/svg/LoadingIcon";

export default function InputLoader({
  title = "Loading...",
}: {
  title?: string;
}) {
  return (
    <div className="flex items-center justify-start h-16 rounded-sm px-6 bg-muted text-default-200 gap-2">
      <LoadingIcon className="size-5 animate-spin" />
      {title}
    </div>
  );
}
