import http from "@/services/http"
import type { User, LoginPayload, SignupPayload } from "@/types"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  async function login(payload: LoginPayload) {
    const response = await http.post<User>("/auth/login", payload)
    localStorage.setItem("token", response.data.apiKey)
    user.value = response.data
  }

  async function signup(payload: SignupPayload) {
    const response = await http.post<User>("/auth/register", payload)
    localStorage.setItem("token", response.data.apiKey)
    user.value = response.data
  }

  function logout() {
    localStorage.removeItem("token")
    user.value = null
  }

  async function init() {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const response = await http.get<User>("/auth/me")
      user.value = response.data
    } catch {
      localStorage.removeItem("token")
      user.value = null
    }
  }

  return { isAuthenticated, login, signup, logout, init }
})
