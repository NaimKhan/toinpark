export const getTransactionStatusColor = (status?: string) => {
  switch (status?.toUpperCase()) {
    case "APPROVED":
    case "SUCCESS":
    case "ACTIVE":
    case "UNREAD":
    case "OPEN":
      return "bg-green-500/15 text-green-500 hover:bg-green-500/25";
    case "REJECTED":
    case "REJECT":
    case "FAILED":
    case "BLOCK":
    case "BLOCKED":
    case "CLOSE":
      return "bg-destructive/15 text-destructive hover:bg-destructive/25";
    case "PENDING":
    case "INITIATE":
      return "bg-[#FB8C00]/15 text-[#FB8C00]";
    case "INACTIVE":
    case "DEACTIVE":
    case "CANCELLED":
    case "READ":
      return "bg-[#757575]/15 text-[#757575]";
    case "COMPLETED":
      return "bg-[#4CAF50]/15 text-[#4CAF50]";
    case "REFUNDED":
      return "bg-[#7B1FA2]/15 text-[#7B1FA2]";
    case "VOIDED":
      return "bg-[#455A64]/15 text-[#455A64]";

    default:
      return "bg-gray-300 text-gray-600";
  }
};
