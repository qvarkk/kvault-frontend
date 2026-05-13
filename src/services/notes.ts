import http from "./http"
import type { Note, Paginated } from "@/types"

export const notesService = {
  list(params?: Record<string, unknown>) {
    return http.get<Paginated<Note>>("/items", { params })
  },

  createText(title: string) {
    return http.post<Note>("/items", { title, type: "text" })
  },

  remove(id: string) {
    return http.delete(`/items/${id}`)
  },

  rename(id: string, title: string) {
    return http.patch<Note>(`/items/${id}`, { title })
  },
}
