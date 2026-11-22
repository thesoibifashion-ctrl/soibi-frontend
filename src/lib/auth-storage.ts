import { networkStatus, reportNetworkFailure } from "@/lib/network-status";

/** Access tokens live only for the lifetime of this JavaScript application. */
let accessToken: string | null = null;
let authenticatedUser: Record<string, unknown> | null = null;
let refreshInFlight: Promise<boolean> | null = null;
let initialization: Promise<boolean> | null = null;
let transientRefreshFailure = false;
let logoutGeneration = 0;
let logoutChannel: BroadcastChannel | null = null;

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
      const generation = logoutGeneration;
      try {
        const response = await fetch(`${API_URL}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        networkStatus.reportResponse();
        if (generation !== logoutGeneration) return false;
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
        if (generation !== logoutGeneration) return false;
        authStorage.setToken(body.data.accessToken, body.data.user);
        return true;
      } catch (error) {
        reportNetworkFailure(error);
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
  logoutGeneration += 1;
  const attempt = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      networkStatus.reportResponse();
      if (!response.ok) throw new Error(`Logout failed (${response.status})`);
    } catch (error) {
      reportNetworkFailure(error);
      throw error;
    }
  };

  try {
    await attempt();
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await attempt();
    } catch {
      throw new Error("We couldn't sign you out. Please check your connection and try again.");
    }
  }

  authStorage.removeToken();
  if (typeof window !== "undefined") window.dispatchEvent(new Event("auth-logout"));
  transientRefreshFailure = false;
  initialization = Promise.resolve(false);
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    logoutChannel ??= new BroadcastChannel("auth-session");
    logoutChannel.postMessage({ type: "logout" });
  } else if (typeof window !== "undefined") {
    localStorage.setItem("auth-logout", String(Date.now()));
    localStorage.removeItem("auth-logout");
  }
}

if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  logoutChannel = new BroadcastChannel("auth-session");
  logoutChannel.addEventListener("message", (event) => {
    if (event.data?.type === "logout") { authStorage.removeToken(); window.dispatchEvent(new Event("auth-logout")); }
  });
}

if (typeof window !== "undefined") window.addEventListener("storage", (event) => {
  if (event.key === "auth-logout") { authStorage.removeToken(); window.dispatchEvent(new Event("auth-logout")); }
});
