<script setup lang="ts">
import { useTags } from "@/composables/useTags"
import { useIntersectionObserver, watchDebounced } from "@vueuse/core"
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Check, Delete, Loader2, RefreshCw, TagIcon } from "lucide-vue-next"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import Separator from "../ui/separator/Separator.vue"
import { tagsService } from "@/services/tags"

const PAGE_SIZE = 20

const { t } = useI18n()
const { tags, loading, error, fetchTags } = useTags()

const page = ref(1)
const hasMore = ref(true)
const loadingMore = ref(false)
const sentinel = ref<HTMLElement | null>(null)

const search = ref("")
const tagIds = defineModel<string[]>("tagIds", { default: [] })

async function fetch() {
  page.value = 1
  hasMore.value = true
  tags.value = []
  await fetchTags({ q: search.value, page_size: PAGE_SIZE })
}

async function fetchMore() {
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
  } finally {
    loadingMore.value = false
  }
}

function retry() {
  fetch()
}

function toggleTag(id: string) {
  tagIds.value = tagIds.value.includes(id)
    ? tagIds.value.filter((t) => t !== id)
    : [...tagIds.value, id]
}

function isSelected(id: string) {
  return tagIds.value.includes(id)
}

function clear() {
  tagIds.value = []
}

useIntersectionObserver(sentinel, ([entry]) => {
  if (entry?.isIntersecting) fetchMore()
})
watchDebounced(search, fetch, { debounce: 400 })
onMounted(fetch)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="w-full gap-2">
        <TagIcon class="w-4 h-4" />
        <span>{{ t("notes.tags.filter") }}</span>
        <Badge v-if="tagIds.length > 0" variant="secondary">
          {{ tagIds.length }}
        </Badge>
      </Button>
    </PopoverTrigger>

    <PopoverContent>
      <Input
        v-model="search"
        :placeholder="t('notes.tags.search')"
        class="h-8"
      />
      <button
        class="flex items-center justify-between px-2 py-1.5 my-2 rounded-md hover:bg-accent text-sm w-full"
        @click="clear"
      >
        <span>{{ t("notes.tags.clear") }}</span>
        <Delete class="w-4 h-4" />
      </button>
      <Separator />
      <div class="flex flex-col max-h-48 overflow-y-auto">
        <button
          v-for="tag in tags"
          :key="tag.id"
          @click="toggleTag(tag.id)"
          class="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-accent text-sm"
        >
          <span>{{ tag.name }}</span>
          <Check v-if="isSelected(tag.id)" class="w-4 h-4" />
        </button>
        <div ref="sentinel" class="h-1" />
        <div v-if="loading || loadingMore" class="flex justify-center py-4">
          <Loader2 class="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
        <div v-if="error" class="flex flex-col items-center gap-2 py-2">
          <p class="text-xs text-destructive">{{ error.detail }}</p>
          <Button variant="ghost" size="sm" @click="retry">
            <RefreshCw class="w-3 h-3 mr-1 pointer-events-none" />
            {{ t("common.retry") }}
          </Button>
        </div>
        <p
          v-if="tags.length === 0 && !loading && !error"
          class="text-sm text-muted-foreground text-center py-2"
        >
          {{ t("notes.tags.none") }}
        </p>
      </div>
    </PopoverContent>
  </Popover>
</template>
