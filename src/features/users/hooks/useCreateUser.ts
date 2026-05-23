import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, type CreateUserDto } from "@/api/users.api";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserDto) =>
      usersApi.create(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
