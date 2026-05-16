<script setup lang="ts">
import type { Note } from "@/types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Badge } from "../ui/badge"
import { timeAgo } from "@/services/format"
import { useRouter } from "vue-router"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ArrowRight, Ellipsis, ExternalLink, Trash2 } from "lucide-vue-next"
import { useI18n } from "vue-i18n"
import { ref } from "vue"
import DeleteNoteAlertModal from "./DeleteNoteAlertModal.vue"

const { t } = useI18n()
const router = useRouter()

const props = defineProps<{
  note: Note
  includeMenu: boolean
}>()

const emit = defineEmits<{
  deleted: [id: string]
}>()

const deleteDialogOpen = ref(false)

function openDelete() {
  deleteDialogOpen.value = true
}

function handleDeleted(id: string) {
  emit("deleted", id)
}

function openInNewTab() {
  window.open(`/notes/${props.note.id}`, "_blank")
}

function redirectToNote() {
  router.push({ name: "note", params: { id: props.note.id } })
}
</script>

<template>
  <Card
    class="group flex flex-col gap-3 p-4 h-full cursor-pointer hover:shadow-md transition-shadow dark:hover:bg-accent dark:transition-colors"
    @click.prevent="redirectToNote"
    @mousedown.middle.prevent="openInNewTab"
    @auxclick.middle="openInNewTab"
  >
    <CardHeader
      class="p-0 flex flex-row items-start justify-between pointer-events-none"
    >
      <CardTitle class="text-base">{{ note.title }}</CardTitle>
      <DropdownMenu v-if="includeMenu">
        <DropdownMenuTrigger as-child @click.stop>
          <Button
            variant="ghost"
            size="icon"
            class="w-6 h-6 shrink-0 -mt-1 -mr-1 dark:hover:brightness-200 transition-all pointer-events-auto"
          >
            <Ellipsis class="w-4 h-4 pointer-events-none" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent @click.stop>
          <DropdownMenuItem @click="openInNewTab">
            <ExternalLink class="w-4 h-4 mr-2 pointer-events-none" />
            {{ t("common.openInNewTab") }}
          </DropdownMenuItem>
          <DropdownMenuItem @click="redirectToNote">
            <ArrowRight class="w-4 h-4 mr-2 pointer-events-none" />
            {{ t("common.open") }}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="openDelete" class="text-destructive">
            <Trash2 class="w-4 h-4 mr-2 pointer-events-none" />
            {{ t("common.delete") }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>

    <CardContent
      class="p-0 text-sm text-muted-foreground flex-1 pointer-events-none"
    >
      {{
        note.content.slice(0, 100) + (note.content.length > 100 ? "..." : "")
      }}
    </CardContent>

    <CardFooter
      class="p-0 flex items-center justify-between pointer-events-none"
    >
      <div class="flex gap-1 flex-wrap">
        <Badge
          v-for="tag in note.tags"
          :key="tag.id"
          variant="secondary"
          class="group-hover:dark:brightness-125 transition-all"
        >
          {{ tag.name }}
        </Badge>
      </div>
      <span class="text-xs text-muted-foreground">{{
        timeAgo(note.updatedAt)
      }}</span>
    </CardFooter>
  </Card>

  <DeleteNoteAlertModal
    v-model:open="deleteDialogOpen"
    :note-id="note.id"
    @deleted="handleDeleted"
  />
</template>
