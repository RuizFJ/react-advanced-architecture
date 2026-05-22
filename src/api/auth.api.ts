//Auth API
//This API is used to authenticate the user, its like a service in NestJS but with axios

import axiosInstance from './axiosInstance'

//Interface for login credentials
interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  access_token: string
  user: {
    id: number
    email: string
    name: string
  }
}

//Export the auth API
//This is the API that is used to authenticate the user
//it has the following methods:
//login: logs in the user
//logout: logs out the user
//me: gets the current user
export const authApi = {
  login: (credentials: LoginCredentials) =>
    axiosInstance.post<LoginResponse>('/auth/login', credentials),

  logout: () =>
    axiosInstance.post('/auth/logout'),

  me: () =>
    axiosInstance.get('/auth/me'),
}