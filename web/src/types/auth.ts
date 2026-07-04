export type AuthResponse = {
  token: string
  userId: string
  name: string
  email: string
}

export type StoredUser = {
  userId: string
  name: string
  email: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
}
