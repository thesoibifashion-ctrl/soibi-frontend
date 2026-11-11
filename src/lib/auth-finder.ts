import { authStorage, initializeAuth } from "@/lib/auth-storage";

/** Internal token helper for non-UI integrations. UI should use useAuth(). */
export const getAccessToken = () => authStorage.getToken();

/** Internal token helper for non-UI integrations. UI should use useAuth(). */
export const isAuthenticated = () => Boolean(getAccessToken());

/** Kept for non-component integrations; React UI should use the shared context. */
export const restoreAuthentication = async () => {
  await initializeAuth();
  return isAuthenticated();
};
