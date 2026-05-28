export interface User {
  id: string
  username: string
  apiKey: string
  updatedAt: string
  createdAt: string
}

export interface LoginPayload {
  username: string
  password: string
}

export type SignupPayload = LoginPayload