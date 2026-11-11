const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { authStorage, isAuthSessionEndpoint, refreshSession } from "@/lib/auth-storage";

type RequestOptions = RequestInit & {
  accessToken?: string;
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { accessToken, headers, ...requestOptions } = options;

  const send = (token: string | null) => fetch(`${API_URL}${endpoint}`, {
    ...requestOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken || token
        ? { Authorization: `Bearer ${accessToken || token}` }
        : {}),
      ...headers,
    },
  });

  let response = await send(authStorage.getToken());
  if (response.status === 401 && !isAuthSessionEndpoint(endpoint)) {
    if (await refreshSession()) response = await send(authStorage.getToken());
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
