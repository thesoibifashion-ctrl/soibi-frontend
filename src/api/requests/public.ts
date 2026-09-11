const VITE_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const publicApiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${VITE_API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
};

export const publicApiGet = <T>(endpoint: string) => {
  return publicApiRequest<T>(endpoint);
};

export const publicApiPost = <T>(
  endpoint: string,
  body?: unknown
) => {
  return publicApiRequest<T>(endpoint, {
    method: "POST",
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });
};

export const publicApiPatch = <T>(
  endpoint: string,
  body?: unknown
) => {
  return publicApiRequest<T>(endpoint, {
    method: "PATCH",
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });
};

export const publicApiPut = <T>(
  endpoint: string,
  body?: unknown
) => {
  return publicApiRequest<T>(endpoint, {
    method: "PUT",
    ...(body !== undefined && {
      body: JSON.stringify(body),
    }),
  });
};

export const publicApiDelete = <T = null>(
  endpoint: string
) => {
  return publicApiRequest<T>(endpoint, {
    method: "DELETE",
  });
};