import axiosInstance from './axiosInstance'

export interface User {
  id: number
  email: string
  name: string
  role: string
}

export const usersApi = {
  getAll: () =>
    axiosInstance.get<User[]>('/users'),

  getById: (id: number) =>
    axiosInstance.get<User>(`/users/${id}`),

  create: (data: Omit<User, 'id'>) =>
    axiosInstance.post<User>('/users', data),

  update: (id: number, data: Partial<User>) =>
    axiosInstance.patch<User>(`/users/${id}`, data),

  delete: (id: number) =>
    axiosInstance.delete(`/users/${id}`),
}