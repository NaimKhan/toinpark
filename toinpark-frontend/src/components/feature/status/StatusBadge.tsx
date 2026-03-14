import { Badge } from "@/components/ui/badge";
import { getTransactionStatusColor } from "@/lib/status-colors/transactionBadgeColor";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}
  
const StatusBadge = ({ status, className, onClick }: StatusBadgeProps) => {
  const statusColor = getTransactionStatusColor(status);

  return (
    <Badge
      onClick={onClick}
      className={cn(
        statusColor,
        "text-sm p-2 font-medium cursor-pointer uppercase border-0 pointer-events-none shadow-none",
        className,
      )}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
