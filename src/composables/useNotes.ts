import { ref } from "vue"
import { notesService } from "@/services/notes"
import type { ApiError, Note } from "@/types"

export function useNotes() {
  const notes = ref<Note[]>([])
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  async function fetchNotes(params?: Record<string, unknown>) {
    loading.value = true
    error.value = null
    try {
      const response = await notesService.list(params)
      notes.value = response.data.data
    } catch (e) {
      error.value = e as ApiError
    } finally {
      loading.value = false
    }
  }

  return { notes, loading, error, fetchNotes }
}
