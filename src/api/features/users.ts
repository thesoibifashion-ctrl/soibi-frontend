import { useMutation } from "@tanstack/react-query";
import { apiPost } from "../requests/auth";


export const useSubmitContact = () => {
    return useMutation({
      mutationFn: (payload: {
        name: string;
        email: string;
        phone?: string;
        subject?: string;
        message: string;
      }) => apiPost("/api/contact", payload),
    });
  };




