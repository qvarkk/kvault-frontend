import axios, { AxiosError } from "axios";
import { camelizeKeys } from "./camelize";
import type { ApiError } from "@/types";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

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
    }

    return Promise.reject(error.response?.data ?? error)
  },
)

export default http