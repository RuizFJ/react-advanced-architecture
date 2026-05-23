import axiosInstance from "./axiosInstance";

interface RoleDetail {
  id: number;
  name: string;
  description: string;
}

interface UserRole {
  userId: number;
  roleId: number;
  role: RoleDetail;
}

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  roles: UserRole[];
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export const usersApi = {
  getAll: () => axiosInstance.get<User[]>("/users"),

  getById: (id: number) => axiosInstance.get<User>(`/users/${id}`),

  create: (data: CreateUserDto) => axiosInstance.post<User>("/users", data),

  update: (id: number, data: UpdateUserDto) =>
    axiosInstance.patch<User>(`/users/${id}`, data),

  delete: (id: number) => axiosInstance.delete(`/users/${id}`),
};
