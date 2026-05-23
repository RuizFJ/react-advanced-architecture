import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().min(1, "El email es requerido").email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").optional(),
  email: z.string().email("Email inválido").optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
