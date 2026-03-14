export const getTicketPriorityColor = (priority?: string) => {
  switch (priority?.toUpperCase()) {
    case "LOW":
      return "bg-[#4CAF50]/15 text-[#4CAF50]";
    case "MEDIUM":
      return "bg-[#FFB020]/15 text-[#FFB020]";
    case "HIGH":
      return "bg-[#F57C00]/15 text-[#F57C00]";
    case "URGENT":
      return "bg-[#D32F2F]/15 text-[#D32F2F]";
    default:
      return "bg-gray-300 text-gray-600";
  }
};

export const getTicketStatusColor = (status?: string) => {
  switch (status?.toUpperCase()) {
    case "OPEN":
      return "bg-[#1976D2]/15 text-[#1976D2]";
    case "RESOLVED":
      return "bg-[#2E7D32]/15 text-[#2E7D32]";
    case "CLOSED":
      return "bg-[#616161]/15 text-[#616161]";
    default:
      return "bg-gray-300 text-gray-600";
  }
};
