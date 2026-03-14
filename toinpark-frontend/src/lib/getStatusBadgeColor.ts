import { TNullish } from "@/store/api/common-api-types";

export default function getStatusBadgeColor(status: string | TNullish) {
  if (!status) {
    return "default";
  }

  const text = status.toLowerCase();

  switch (text) {
    case "active":
      return "success";

    case "inactive":
      return "destructive";

    case "pending":
      return "secondary";

    case "cancelled":
      return "destructive";

    case "scheduled":
      return "info";

    default:
      return "default";
  }
}
