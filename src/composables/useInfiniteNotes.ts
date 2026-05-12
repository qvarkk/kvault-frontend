import { ref } from "vue"
import { notesService } from "@/services/notes"
import type { Note, ApiError } from "@/types"

export function useInfiniteNotes() {
  const notes = ref<Note[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<ApiError | null>(null)
  const page = ref(1)
  const hasMore = ref(true)

  async function fetchNotes(params?: Record<string, unknown>) {
    loading.value = true
    error.value = null
    notes.value = []
    page.value = 1
    hasMore.value = true

    try {
      const response = await notesService.list({ ...params, page: 1 })
      notes.value = response.data.data
      hasMore.value =
        response.data.page * response.data.pageSize < response.data.total
    } catch (e) {
      error.value = e as ApiError
    } finally {
      loading.value = false
    }
  }

  async function loadMore(params?: Record<string, unknown>) {
    if (!hasMore.value || loadingMore.value || loading.value) return
    loadingMore.value = true

    try {
      page.value++
      const response = await notesService.list({ ...params, page: page.value })
      notes.value = [...notes.value, ...response.data.data]
      hasMore.value =
        response.data.page * response.data.pageSize < response.data.total
    } catch (e) {
      error.value = e as ApiError
    } finally {
      loadingMore.value = false
    }
  }

  return { notes, loading, loadingMore, error, hasMore, fetchNotes, loadMore }
}
