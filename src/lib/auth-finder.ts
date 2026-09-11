export const getAccessToken = () => {
    if (typeof window === "undefined") return null;
  
    return localStorage.getItem("accessToken");
  };
  
  export const isAuthenticated = () => {
    return Boolean(getAccessToken());
  };