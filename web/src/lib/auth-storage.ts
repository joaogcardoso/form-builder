import type { AuthResponse, StoredUser } from "@/types/auth"

const TOKEN_KEY = "forms_access_token"
const USER_KEY = "forms_user"

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getStoredUser(): StoredUser | null {
  const rawUser = localStorage.getItem(USER_KEY)
  if (!rawUser) return null

  try {
    return JSON.parse(rawUser) as StoredUser
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function setStoredUser(user: StoredUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function persistAuth(auth: AuthResponse) {
  setToken(auth.token)
  setStoredUser({
    userId: auth.userId,
    name: auth.name,
    email: auth.email,
  })
}

export function clearAuthStorage() {
  removeToken()
  localStorage.removeItem(USER_KEY)
}
