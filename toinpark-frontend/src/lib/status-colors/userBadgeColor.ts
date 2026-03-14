export const getUserStatusColor = (status?: string) => {
  switch (status?.toUpperCase()) {
    case "SUSPENDED":
      return "bg-[#0288D1]/15 text-[#0288D1]";
    case "INACTIVE":
      return "bg-[#FB8C00]/15 text-[#FB8C00]";
    case "ACTIVE":
      return "bg-[#4CAF50]/15 text-[#4CAF50]";
    case "BLOCKED":
      return "bg-[#D32F2F]/15 text-[#D32F2F]";
    default:
      return "bg-gray-300 text-gray-600";
  }
};
