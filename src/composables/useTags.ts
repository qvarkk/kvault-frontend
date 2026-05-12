import { ref } from "vue"
import { tagsService } from "@/services/tags"
import type { ApiError, Tag } from "@/types"

export function useTags() {
  const tags = ref<Tag[]>([])
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  async function fetchTags(params?: Record<string, unknown>) {
    loading.value = true
    error.value = null
    try {
      const response = await tagsService.list(params)
      tags.value = response.data.data
    } catch (e) {
      error.value = e as ApiError
    } finally {
      loading.value = false
    }
  }

  return { tags, loading, error, fetchTags }
}
