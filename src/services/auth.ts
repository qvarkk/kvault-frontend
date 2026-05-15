import http from "./http"
import type { User } from "@/types"

export const authService = {
  refreshApiKey() {
    return http.post<User>("/auth/refresh")
  },

  updatePassword(oldPassword: string, newPassword: string) {
    return http.patch("/auth/account", {
      old_password: oldPassword,
      new_password: newPassword,
    })
  },

  deleteAccount(password: string) {
    return http.delete("/auth/account", { data: { password } })
  },
}
