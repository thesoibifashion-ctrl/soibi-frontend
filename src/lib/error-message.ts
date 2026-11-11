export const getErrorMessage = (error: unknown) => {
    const message =
      error instanceof Error ? error.message.toLowerCase() : "";
  
    if (
      message.includes("network error") ||
      message.includes("failed to fetch") ||
      message.includes("load failed") ||
      message.includes("network request failed")
    ) {
      return "Network error. Please check your internet connection and try again.";
    }
  
    return "Something went wrong while loading the homepage. Please try again.";
  };