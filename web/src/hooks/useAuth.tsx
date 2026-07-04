import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import {
  clearAuthStorage,
  getStoredUser,
  persistAuth,
} from "@/lib/auth-storage"
import { authService } from "@/services/auth-service"
import type { LoginRequest, RegisterRequest, StoredUser } from "@/types/auth"

type AuthContextValue = {
  user: StoredUser | null
  isAuthenticated: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(() => getStoredUser())

  const logout = useCallback(() => {
    clearAuthStorage()
    setUser(null)
  }, [])

  useEffect(() => {
    window.addEventListener("auth:unauthorized", logout)
    return () => window.removeEventListener("auth:unauthorized", logout)
  }, [logout])

  const login = useCallback(async (data: LoginRequest) => {
    const auth = await authService.login(data)
    persistAuth(auth)
    setUser({ userId: auth.userId, name: auth.name, email: auth.email })
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    const auth = await authService.register(data)
    persistAuth(auth)
    setUser({ userId: auth.userId, name: auth.name, email: auth.email })
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [login, logout, register, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
