import { api } from "@/lib/api"
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth"

export const authService = {
  async register(data: RegisterRequest) {
    const response = await api.post<AuthResponse>("/auth/register", data)
    return response.data
  },

  async login(data: LoginRequest) {
    const response = await api.post<AuthResponse>("/auth/login", data)
    return response.data
  },
}
