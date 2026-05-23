import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import type { LoginFormData } from "../schemas/login.schema";

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    //esta funcion es la que se encarga de realizar la petición de login al backend, recibe las credenciales del formulario y llama a la función login del authApi, luego extrae los datos de la respuesta
    //luego se renombra la función mutate a login para que sea más semántica en el contexto de este hook
    mutationFn: (credentials: LoginFormData) =>
      authApi.login(credentials).then((res) => res.data),

    onSuccess: (data: { user: any; access_token: string }) => {
      setAuth(data.user, data.access_token);
      navigate("/");
    },
  });

  return {
    //en esta parte se renombra la función mutate a login para que sea más semántica en el contexto de este hook
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
