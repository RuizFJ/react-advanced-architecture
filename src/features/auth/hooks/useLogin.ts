import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import type { LoginFormData } from "../schemas/login.schema";

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: (credentials: LoginFormData) =>
      authApi.login(credentials).then((res) => res.data),

    onSuccess: (data: { user: any; access_token: string }) => {
      setAuth(data.user, data.access_token);
      navigate("/");
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
