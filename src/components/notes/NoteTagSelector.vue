<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useI18n } from "vue-i18n"
import { Plus, Loader2, RefreshCw } from "lucide-vue-next"
import { watchDebounced, useIntersectionObserver } from "@vueuse/core"
import { useTags } from "@/composables/useTags"
import { tagsService } from "@/services/tags"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { ApiError } from "@/types"
import { toast } from "vue-sonner"

const PAGE_SIZE = 20

const { t } = useI18n()

const props = defineProps<{
  noteId: string
  boundTagIds: string[]
}>()

const emit = defineEmits<{
  bind: [tagId: string]
}>()

const { tags, loading, error, fetchTags } = useTags()
const search = ref("")
const page = ref(1)
const hasMore = ref(true)
const loadingMore = ref(false)
const sentinel = ref<HTMLElement | null>(null)

async function loadTags() {
  page.value = 1
  hasMore.value = true
  tags.value = []
  await fetchTags({ q: search.value, page_size: PAGE_SIZE })
}

async function loadMore() {
  if (!hasMore.value || loadingMore.value || loading.value) return
  loadingMore.value = true
  try {
    page.value++
    const response = await tagsService.list({
      q: search.value,
      page: page.value,
      page_size: PAGE_SIZE,
    })
    tags.value = [...tags.value, ...response.data.data]
    hasMore.value =
      response.data.page * response.data.pageSize < response.data.total
  } catch (e) {
    toast.error((e as ApiError).detail)
  } finally {
    loadingMore.value = false
  }
}

async function handleCreate() {
  if (!search.value.trim()) return
  try {
    const response = await tagsService.create(search.value.trim())
    emit("bind", response.data.id)
    search.value = ""
    await loadTags()
  } catch (e) {
    toast.error((e as ApiError).detail)
  }
}

async function handleBind(tagId: string) {
  emit("bind", tagId)
}

const unbound = computed(() =>
  tags.value.filter((t) => !props.boundTagIds.includes(t.id)),
)

const exactMatch = computed(() =>
  tags.value.some((t) => t.name.toLowerCase() === search.value.toLowerCase()),
)

useIntersectionObserver(sentinel, ([entry]) => {
  if (entry && entry.isIntersecting) {
    loadMore()
  }
})

watchDebounced(search, loadTags, { debounce: 400 })
onMounted(loadTags)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        class="text-xs h-6 gap-1 rounded-full"
      >
        <Plus class="size-3 pointer-events-none" />
        {{ t("notes.tags.add") }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-56 p-2 flex flex-col gap-2">
      <Input
        v-model="search"
        :placeholder="t('notes.tags.search')"
        class="h-8"
      />

      <div v-if="loading" class="flex justify-center py-4">
        <Loader2 class="w-4 h-4 animate-spin text-muted-foreground" />
      </div>

      <div v-else-if="error" class="flex flex-col items-center gap-2 py-2">
        <p class="text-xs text-destructive">{{ error.detail }}</p>
        <Button variant="ghost" size="sm" @click="loadTags">
          <RefreshCw class="w-3 h-3 mr-1 pointer-events-none" />
          {{ t("common.retry") }}
        </Button>
      </div>

      <div v-else class="flex flex-col max-h-48 overflow-y-auto">
        <button
          v-for="tag in unbound"
          :key="tag.id"
          @click="handleBind(tag.id)"
          class="flex items-center px-2 py-1.5 rounded-md hover:bg-accent text-sm cursor-pointer text-left"
        >
          {{ tag.name }}
        </button>
        <p v-if="unbound.length === 0">
          <Button
            v-if="search.trim() && !exactMatch"
            @click="handleCreate"
            class="w-full m-0"
          >
            <Plus class="w-3 h-3 pointer-events-none" />
            {{ t("notes.tags.create", { name: search }) }}
          </Button>
        </p>
        <div ref="sentinel" class="h-1" />
        <div v-if="loadingMore" class="flex justify-center py-2">
          <Loader2 class="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
