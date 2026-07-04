import axios, { AxiosError } from "axios"

import { clearAuthStorage, getToken } from "@/lib/auth-storage"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearAuthStorage()
      window.dispatchEvent(new Event("auth:unauthorized"))
    }
    return Promise.reject(error)
  }
)

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    return data?.message || "Não foi possível concluir a operação."
  }

  return "Não foi possível concluir a operação."
}
