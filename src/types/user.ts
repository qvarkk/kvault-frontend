export interface User {
  id: string
  email: string
  apiKey: string
  updatedAt: string
  createdAt: string
}

export interface LoginPayload {
  email: string
  password: string
}

export type RegisterPayload = LoginPayload