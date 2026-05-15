import { ref } from "vue"
import { filesService } from "@/services/files"
import type { File, ApiError } from "@/types"

export function useInfiniteFiles() {
  const files = ref<File[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<ApiError | null>(null)
  const page = ref(1)
  const hasMore = ref(true)

  async function fetchFiles(params?: Record<string, unknown>) {
    loading.value = true
    error.value = null
    files.value = []
    page.value = 1
    hasMore.value = true

    try {
      const response = await filesService.list({ ...params, page: 1 })
      files.value = response.data.data
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
      const response = await filesService.list({ ...params, page: page.value })
      files.value = [...files.value, ...response.data.data]
      hasMore.value =
        response.data.page * response.data.pageSize < response.data.total
    } catch (e) {
      error.value = e as ApiError
    } finally {
      loadingMore.value = false
    }
  }

  return { files, loading, loadingMore, error, hasMore, fetchFiles, loadMore }
}
