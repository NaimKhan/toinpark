import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  total?: string;
  onClick?: () => void;
}

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  total,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className="py-10 bg-transparent border border-border hover:shadow-lg hover:scale-[1.01] transition cursor-pointer hover:bg-primary/20 "
    >
      <CardContent className="h-full flex flex-col justify-center items-center space-y-3 text-center">
        <div className="bg-default-100/20 p-3 rounded-full">
          {Icon && <Icon className="text-primary" />}
        </div>
        <h2 className="text-3xl font-bold text-default-100">{value}</h2>
        <p className="text-default-100 text-sm">{title}</p>
        <p className="text-default-100 text-sm">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
