<script setup lang="ts">
import AppLayout from "@/components/layout/AppLayout.vue"
import NotesToolbar from "@/components/notes/NotesToolbar.vue"
import { useNotes } from "@/composables/useNotes"
import { watchDebounced } from "@vueuse/core"
import { ref, watch } from "vue"

const query = ref("")
const sortBy = ref("updated_at")
const orderBy = ref("DESC")
const tagIds = ref<string[]>([])

const { notes, loading, error, fetchNotes } = useNotes()

watchDebounced(query, loadNotes, { debounce: 400 })
watch([sortBy, orderBy, tagIds], loadNotes)

async function loadNotes() {
  await fetchNotes({
    q: query.value,
    sort_by: sortBy.value,
    order_by: orderBy.value,
    tag_ids: tagIds.value,
    page_size: 20,
  })
}
</script>

<template>
  <AppLayout>
    <h1>Notes</h1>
    <NotesToolbar
      v-model:query="query"
      v-model:order-by="orderBy"
      v-model:sort-by="sortBy"
      v-model:tag-ids="tagIds"
    />
  </AppLayout>
</template>
