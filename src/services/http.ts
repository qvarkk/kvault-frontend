import axios, { AxiosError } from "axios"
import { camelizeKeys } from "./camelize"
import type { ApiError } from "@/types"
import i18n from "@/i18n"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

http.defaults.paramsSerializer = {
  indexes: null,
}

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = token
  }

  return config
})

http.interceptors.response.use(
  (response) => {
    response.data = camelizeKeys(response.data)
    return response
  },
  (error: AxiosError<ApiError>) => {
    if (error.response?.data) {
      error.response.data = camelizeKeys(error.response.data) as ApiError
      return Promise.reject(error.response.data)
    }

    return Promise.reject({
      title: i18n.global.t("errors.network.title"),
      detail: i18n.global.t("errors.network.detail"),
      status: 0,
    } as ApiError)
  },
)

export default http
