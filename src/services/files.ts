import http from './http'
import type { File, Paginated } from '@/types'

export const filesService = {
  list(params?: Record<string, unknown>) {
    return http.get<Paginated<File>>('/files', { params })
  },

  getDownloadUrl(id: string) {
    return http.get<{ url: string }>(`/files/${id}`)
  },

  upload(file: globalThis.File, onProgress?: (percent: number) => void) {
    const formData = new FormData()
    formData.append('file', file)
    return http.post<File>('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress(event) {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded / event.total) * 100))
        }
      }
    })
  },

  remove(id: string) {
    return http.delete(`/files/${id}`)
  },

  restore(id: string) {
    return http.post(`/files/${id}/restore`)
  }
}