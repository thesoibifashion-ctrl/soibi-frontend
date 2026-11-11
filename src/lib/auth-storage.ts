/** Access tokens live only for the lifetime of this JavaScript application. */
let accessToken: string | null = null;
let authenticatedUser: Record<string, unknown> | null = null;
let refreshInFlight: Promise<boolean> | null = null;
let initialization: Promise<boolean> | null = null;
let transientRefreshFailure = false;

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const isAuthSessionEndpoint = (path: string) =>
  ["/api/auth/login", "/api/auth/request-code", "/api/auth/verify-code", "/api/auth/refresh", "/api/auth/logout"]
    .some((endpoint) => path.split("?")[0] === endpoint);

export const authStorage = {
  getToken: () => accessToken,
  getUser: () => authenticatedUser,
  hasTransientRefreshFailure: () => transientRefreshFailure,
  setToken: (token: string, user?: Record<string, unknown>) => {
    accessToken = token;
    if (user) authenticatedUser = user;
    if (typeof window !== "undefined") window.dispatchEvent(new Event("auth-change"));
  },
  removeToken: () => {
    accessToken = null;
    authenticatedUser = null;
    if (typeof window !== "undefined") window.dispatchEvent(new Event("auth-change"));
  },
};

export async function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) {
          transientRefreshFailure = response.status !== 401 && response.status !== 403;
          if (!transientRefreshFailure) authStorage.removeToken();
          return false;
        }
        const body = await response.json();
        if (!body.success || !body.data?.accessToken) {
          transientRefreshFailure = true;
          return false;
        }
        transientRefreshFailure = false;
        authStorage.setToken(body.data.accessToken, body.data.user);
        return true;
      } catch {
        transientRefreshFailure = true;
        return false;
      }
    })().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

export function initializeAuth(): Promise<boolean> {
  if (!initialization) initialization = refreshSession().finally(() => {
    if (transientRefreshFailure) initialization = null;
  });
  return initialization;
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Always complete local sign-out even when the API is unreachable.
  } finally {
    authStorage.removeToken();
    transientRefreshFailure = false;
    initialization = Promise.resolve(false);
  }
}
