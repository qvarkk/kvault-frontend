import http from "./http"
import type { Note, Paginated } from "@/types"

export const notesService = {
  list(params?: Record<string, unknown>) {
    return http.get<Paginated<Note>>("/items", { params })
  },
}
