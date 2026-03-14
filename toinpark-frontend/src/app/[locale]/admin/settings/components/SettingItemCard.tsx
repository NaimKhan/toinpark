import GradientText from "@/components/feature/text/gradientText";
import Link from "next/link";

interface ISettingItemCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

export default function SettingItemCard({
  icon,
  title,
  description,
  href,
}: ISettingItemCardProps) {
  return (
    <Link
      href={href || ""}
      className="flex justify-start items-start gap-2 p-6 bg-border/50 hover:bg-border/80 rounded-md border border-border cursor-pointer transition delay-50 duration-300"
    >
      <div className="p-2 bg-primary/10 rounded-sm text-primary w-fit">
        {icon}
      </div>
      <div className="space-y-1.5">
        <GradientText label={title} className="text-lg font-semibold" />
        <p className="text-default-200">{description}</p>
      </div>
    </Link>
  );
}
