import http from "./http"
import type { User } from "@/types"

export const authService = {
  refreshApiKey() {
    return http.post<User>("/auth/refresh")
  },

  updatePassword(password: string) {
    return http.patch("/auth/account", { password })
  },

  deleteAccount(password: string) {
    return http.delete("/auth/account", { data: { password } })
  },
}
