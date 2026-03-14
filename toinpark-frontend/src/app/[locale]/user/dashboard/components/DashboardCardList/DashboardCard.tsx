import GradientText from "@/components/feature/text/gradientText";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface DashboardCardProps {
  imageSrc: string;
  linkHref: string;
  title: string;
  excerpt: string;
}

function DashboardCard({
  imageSrc,
  linkHref,
  title,
  excerpt,
}: DashboardCardProps) {
  return (
    <Card className="p-0 border bg-secondary-background overflow-hidden">
      <CardContent className=" p-0">
        <Image
          className="w-full"
          src={imageSrc}
          height={240}
          width={464}
          alt={title}
        />
        <div className="p-7">
          <GradientText asChild>
            <Link
              href={linkHref}
              className="text-xl font-medium hover:text-white transition delay-150 duration-300 ease-in-out"
            >
              {title}
            </Link>
          </GradientText>
          <p className="text-default-200 mt-2">{excerpt}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
