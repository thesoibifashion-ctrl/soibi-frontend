import { apiClient } from "@/lib/api-client";
import { apiGet, apiPost } from "../requests/auth";
import { useQuery } from "@tanstack/react-query";

type LoginPayload = {
  email: string;
  password?: string;
  fullName?:string
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
    return apiGet<LoginPayload>("/api/auth/me");
  };

  export const useGetAuth = () => {
    return useQuery({
      queryKey: ["auth-me"],
      queryFn: getAuth,
    });
  };