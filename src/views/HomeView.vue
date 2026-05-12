<script setup lang="ts">
import AppLayout from "@/components/layout/AppLayout.vue"
import NoteCard from "@/components/notes/NoteCard.vue"
import NoteSkeleton from "@/components/notes/NoteSkeleton.vue"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useNotes } from "@/composables/useNotes"
import { useHead } from "@vueuse/head"
import { NotebookPen, RefreshCw } from "lucide-vue-next"
import { onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

const { t } = useI18n()
const router = useRouter()
useHead({ title: t("head.home") })

const { notes, loading, error, fetchNotes } = useNotes()

function fetch() {
  fetchNotes({ sort_by: "updated_at", order_by: "DESC", page_size: 9 })
}

onMounted(fetch)
</script>

<template>
  <AppLayout>
    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6"
    >
      <NoteSkeleton v-for="n in 9" :key="n" />
    </div>

    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center gap-4 py-24 text-muted-foreground"
    >
      <p class="text-destructive">{{ error.detail }}</p>
      <Button variant="outline" @click="fetch">
        <RefreshCw class="w-4 h-4 mr-2" />
        {{ t("common.retry") }}
      </Button>
    </div>

    <div v-else class="flex flex-col gap-6 p-6">
      <div>
        <h1 class="text-2xl font-bold">{{ t("home.greeting") }}</h1>
        <p class="text-muted-foreground">{{ t("home.subtitle") }}</p>
      </div>

      <div
        v-if="notes.length === 0"
        class="flex flex-col items-center justify-center gap-4 py-24 text-muted-foreground"
      >
        <NotebookPen class="w-12 h-12" />
        <p>{{ t("notes.empty") }}</p>
        <Button @click="router.push({ name: 'notes' })">
          {{ t("notes.createFirst") }}
        </Button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NoteCard v-for="note in notes" :key="note.id" :note="note" />
      </div>

      <div v-if="notes.length > 0" class="flex justify-center">
        <Button variant="ghost" @click="router.push({ name: 'notes' })">
          {{ t("home.viewAll") }}
        </Button>
      </div>
    </div>
  </AppLayout>
</template>
