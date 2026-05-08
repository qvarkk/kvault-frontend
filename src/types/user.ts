export interface User {
  id: string
  email: string
  apiKey: string
  updatedAt: string
  createdAt: string
}

export interface UserAuthenticatePayload {
  email: string
  password: string
}

export type UserRegisterPayload = UserAuthenticatePayload