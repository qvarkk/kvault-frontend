import http from "./http"
import type {
  BindTagPayload,
  Note,
  NoteUpdatePayload,
  Paginated,
  Tag,
} from "@/types"

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

  getById(id: string) {
    return http.get<Note>(`/items/${id}`)
  },

  update(id: string, payload: NoteUpdatePayload) {
    return http.patch<Note>(`/items/${id}`, payload)
  },

  bindTag(itemId: string, payload: BindTagPayload) {
    return http.post(`/items/${itemId}/tags`, payload)
  },

  unbindTag(itemId: string, tagId: string) {
    return http.delete(`/items/${itemId}/tags/${tagId}`)
  },

  autotag(id: string, number: number) {
    return http.post<Tag[]>(`/items/${id}/autotag`, { number })
  },
}
