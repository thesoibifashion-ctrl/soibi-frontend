// import { apiClient } from "@/lib/api-client";
// import { apiGet, apiPost,apiDelete,apiPatch,apiPut } from "../requests/auth";
// import { useQuery } from "@tanstack/react-query";

// type LoginPayload = {
//   email: string;
//   password?: string;
//   fullName?:string
// };

// export type LoginResponse = {
//   success: boolean;
//   message: string;
//   data: {
//     accessToken: string;
//     tokenType: string;
//     expiresIn: string;
//     user: {
//       id: string;
//       email: string;
//       fullName: string;
//       phone: string | null;
//       avatarUrl: string | null;
//       role: string;
//       isActive: boolean;
//     };
//   };
// };
// interface VerifyCodeResponse {
//   success: boolean;
//   message: string;
//   accessToken: string;
//   data: {
//     accessToken: string;
//     expiresIn: string;
//     tokenType: string;
//     user: {
//       id: string;
//       email: string;
//       fullName: string;
//       avatarUrl: string | null;
//       isActive: boolean;
//       phone: string | null;
//       role: string;
//     };
//   };
// }

// export const login = (payload: LoginPayload) =>
//   apiClient<LoginResponse>("/api/auth/login", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
//   export const requestCode = (payload: { email: string }) => {
//     return apiPost("/api/auth/request-code", payload);
//   };
  
//   export const verifyCode = (payload: { email: string; code: string }) => {
//     return apiPost<VerifyCodeResponse>("/api/auth/verify-code", payload);
//   };

//   export const getAuth = () => {
//     return apiGet<LoginPayload>("/api/auth/me");
//   };

//   export const useGetAuth = () => {
//     return useQuery({
//       queryKey: ["auth-me"],
//       queryFn: getAuth,
//     });
//   };
import { apiClient } from "@/lib/api-client";
import { apiGet, apiPost, apiDelete, apiPatch, apiPut } from "../requests/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type LoginPayload = {
  email: string;
  password?: string;
  fullName?: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      phone: string | null;
      avatarUrl: string | null;
      role: string;
      isActive: boolean;
    };
  };
};
interface VerifyCodeResponse {
  success: boolean;
  message: string;
  accessToken: string;
  data: {
    accessToken: string;
    expiresIn: string;
    tokenType: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      avatarUrl: string | null;
      isActive: boolean;
      phone: string | null;
      role: string;
    };
  };
}

export interface Profile {
  id: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  preferredContactMethod: "email" | "whatsapp" | null;
  country: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  role: string;
  isActive: boolean;
}

export interface UpdateProfilePayload {
  fullName?: string;
  phone?: string;
  preferredContactMethod?: "email" | "whatsapp";
  country?: string;
  state?: string;
  city?: string;
  address?: string;
}

export const login = (payload: LoginPayload) =>
  apiClient<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
export const requestCode = (payload: { email: string }) => {
  return apiPost("/api/auth/request-code", payload);
};

export const verifyCode = (payload: { email: string; code: string }) => {
  return apiPost<VerifyCodeResponse>("/api/auth/verify-code", payload);
};

export const getAuth = () => {
  return apiGet<Profile>("/api/auth/me");
};

export const useGetAuth = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["auth-me"],
    queryFn: getAuth,
    enabled,
  });
};
export const updateProfile = (payload: UpdateProfilePayload) => {
  return apiPatch<Profile>("/api/auth/me", payload);
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-me"], data);
    },
  });
};