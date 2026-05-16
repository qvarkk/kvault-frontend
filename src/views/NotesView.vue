<script setup lang="ts">
import AppLayout from "@/components/layout/AppLayout.vue"
import CreateNoteModal from "@/components/notes/CreateNoteModal.vue"
import NoteCard from "@/components/notes/NoteCard.vue"
import NoteSkeleton from "@/components/notes/NoteSkeleton.vue"
import NotesToolbar from "@/components/notes/NotesToolbar.vue"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useInfiniteEntities } from "@/composables/useInfiniteEntities"
import { notesService } from "@/services/notes"
import type { Note } from "@/types"
import { useIntersectionObserver, watchDebounced } from "@vueuse/core"
import { useHead } from "@vueuse/head"
import { NotebookPen, Plus, RefreshCw } from "lucide-vue-next"
import { computed, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"

const PAGE_SIZE = 20

const { t } = useI18n()
useHead({ title: t("head.notes") })

const query = ref("")
const sortBy = ref("updated_at")
const orderBy = ref("DESC")
const tagIds = ref<string[]>([])
const createModalOpen = ref(false)

const { entities, loading, loadingMore, error, fetchEntities, loadMore } =
  useInfiniteEntities<Note>(notesService)

const sentinel = ref<HTMLElement | null>(null)

const params = computed(() => ({
  q: query.value,
  sort_by: sortBy.value,
  order_by: orderBy.value,
  tag_ids: tagIds.value,
  page_size: PAGE_SIZE,
}))

async function loadNotes() {
  await fetchEntities(params.value)
}

function openCreateModal() {
  createModalOpen.value = true
}

function handleNoteDeleted(id: string) {
  entities.value = entities.value.filter((n) => n.id !== id)
}

useIntersectionObserver(sentinel, ([entry]) => {
  if (entry?.isIntersecting) loadMore(params.value)
})

watchDebounced(query, loadNotes, { debounce: 400 })
watch([sortBy, orderBy, tagIds], loadNotes)
onMounted(loadNotes)
</script>

<template>
  <AppLayout>
    <div class="flex flex-col gap-4 container">
      <NotesToolbar
        v-model:query="query"
        v-model:sortBy="sortBy"
        v-model:orderBy="orderBy"
        v-model:tagIds="tagIds"
        v-model:loading="loading"
      />

      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <NoteSkeleton v-for="n in 20" :key="n" />
      </div>

      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center gap-4 pt-24 pb-8 text-muted-foreground"
      >
        <p class="text-destructive">{{ error.detail }}</p>
        <Button variant="outline" @click="loadNotes">
          <RefreshCw class="w-4 h-4 mr-2" />
          {{ t("common.retry") }}
        </Button>
      </div>

      <div v-else>
        <div
          v-if="entities.length === 0"
          class="flex flex-col items-center justify-center gap-4 pt-24 pb-8 text-muted-foreground"
        >
          <NotebookPen class="w-12 h-12" />
          <p>{{ t("notes.empty") }}</p>
          <Button @click="openCreateModal">
            {{ t("notes.create.first") }}
          </Button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <NoteCard
            v-for="note in entities"
            :key="note.id"
            :note="note"
            :include-menu="true"
            @deleted="handleNoteDeleted"
          />
        </div>

        <div ref="sentinel" class="h-1" />

        <div v-if="loadingMore" class="flex justify-center py-4">
          <Spinner />
        </div>
      </div>
    </div>

    <Button
      class="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg"
      size="icon"
      @click="openCreateModal"
    >
      <Plus class="w-5 h-5 pointer-events-none" />
    </Button>
  </AppLayout>

  <CreateNoteModal v-model:open="createModalOpen" />
</template>
