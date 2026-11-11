const VITE_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { authStorage, isAuthSessionEndpoint, refreshSession } from "@/lib/auth-storage";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const send = (token: string | null) => fetch(`${VITE_API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let response = await send(authStorage.getToken());
  if (response.status === 401 && !isAuthSessionEndpoint(endpoint)) {
    if (await refreshSession()) response = await send(authStorage.getToken());
  }

  const result: ApiResponse<T> = await response.json().catch(() => ({ success: false, message: "Request failed", data: undefined as T }));

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
};

export const apiGet = <T>(endpoint: string) => {
  return apiRequest<T>(endpoint);
};

export const apiPost = <T>(endpoint: string, body?: unknown) => {
  return apiRequest<T>(endpoint, {
    method: "POST",
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });
};

export const apiPatch = <T>(endpoint: string, body?: unknown) => {
  return apiRequest<T>(endpoint, {
    method: "PATCH",
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });
};

export const apiPut = <T>(endpoint: string, body?: unknown) => {
  return apiRequest<T>(endpoint, {
    method: "PUT",
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });
};

export const apiDelete = <T = null>(endpoint: string) => {
  return apiRequest<T>(endpoint, {
    method: "DELETE",
  });
};
