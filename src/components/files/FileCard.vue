<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { FileText, Download, Trash2, Ellipsis } from "lucide-vue-next"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { File } from "@/types"
import { timeAgo } from "@/services/format"

const { t } = useI18n()

const props = defineProps<{
  file: File
}>()

const emit = defineEmits<{
  download: [id: string]
  delete: [id: string]
}>()

const deleteOpen = ref(false)

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  ready: "default",
  uploading: "secondary",
  processing: "secondary",
  error: "destructive",
}
</script>

<template>
  <Card class="flex flex-col gap-2 p-4">
    <CardHeader class="p-0 flex flex-row items-start justify-between">
      <div class="flex items-center gap-2 min-w-0">
        <FileText
          class="w-4 h-4 shrink-0 text-muted-foreground pointer-events-none"
        />
        <CardTitle class="text-sm truncate">{{ file.originalName }}</CardTitle>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child @click.stop>
          <Button variant="ghost" size="icon" class="w-6 h-6 shrink-0">
            <Ellipsis class="w-4 h-4 pointer-events-none" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent @click.stop>
          <DropdownMenuItem
            @click="emit('download', file.id)"
            :disabled="file.status !== 'ready'"
          >
            <Download class="w-4 h-4 mr-2 pointer-events-none" />
            {{ t("files.download") }}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="deleteOpen = true" class="text-destructive">
            <Trash2 class="w-4 h-4 mr-2 pointer-events-none" />
            {{ t("common.delete") }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>

    <CardContent class="p-0 flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <Badge :variant="statusVariant[file.status]" class="text-xs">
          {{ t(`files.status.${file.status}`) }}
        </Badge>
        <span class="text-xs text-muted-foreground">
          {{ formatSize(file.size) }}
        </span>
      </div>
    </CardContent>

    <CardFooter class="p-0 flex items-center justify-between">
      <span class="text-xs text-muted-foreground">{{
        timeAgo(file.createdAt)
      }}</span>
      <Button
        variant="outline"
        size="sm"
        :disabled="file.status !== 'ready'"
        @click="emit('download', file.id)"
      >
        <Download class="w-3 h-3 mr-1 pointer-events-none" />
        {{ t("files.download") }}
      </Button>
    </CardFooter>
  </Card>

  <AlertDialog v-model:open="deleteOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ t("files.delete.title") }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ t("files.delete.description") }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{{ t("common.cancel") }}</AlertDialogCancel>
        <AlertDialogAction
          @click="emit('delete', file.id)"
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          {{ t("common.delete") }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
