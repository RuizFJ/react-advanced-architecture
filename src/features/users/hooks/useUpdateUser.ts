import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, type UpdateUserDto } from "@/api/users.api";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserDto }) =>
      usersApi.update(id, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
