export const formatPrice = (value: number) =>
    `₦${Number(value || 0).toLocaleString("en-NG")}`;
  
  export const formatDate = (date?: string | null) => {
    if (!date) return "—";
  
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  
  export const formatDateTime = (date?: string | null) => {
    if (!date) return "—";
  
    return new Date(date).toLocaleString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };
  
  export const formatStatus = (status?: string) => {
    if (!status) return "Pending";
  
    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  export const getStatusClasses = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "border-green-200 bg-green-50 text-green-700";
  
      case "cancelled":
        return "border-red-200 bg-red-50 text-red-700";
  
      case "shipped":
      case "processing":
        return "border-blue-200 bg-blue-50 text-blue-700";
  
      default:
        return "border-[#C9A227]/30 bg-[#C9A227]/10 text-[#927f04]";
    }
  };
  