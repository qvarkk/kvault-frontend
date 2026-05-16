<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useI18n } from "vue-i18n"
import {
  watchDebounced,
  useIntersectionObserver,
  useDropZone,
} from "@vueuse/core"
import { useInfiniteEntities } from "@/composables/useInfiniteEntities"
import { filesService } from "@/services/files"
import { toast } from "vue-sonner"
import type { ApiError, UploadItem, File } from "@/types"
import { Check, FileIcon, Files, RefreshCw } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/components/layout/AppLayout.vue"
import FileCard from "@/components/files/FileCard.vue"
import { Spinner } from "@/components/ui/spinner"
import FilesToolbar from "@/components/files/FilesToolbar.vue"
import { useHead } from "@vueuse/head"

const PAGE_SIZE = 20

const { t } = useI18n()
useHead({ title: t("head.files") })
const { entities, loading, loadingMore, error, fetchEntities, loadMore } =
  useInfiniteEntities<File>(filesService)

const query = ref("")
const sortBy = ref("created_at")
const orderBy = ref("DESC")
const sentinel = ref<HTMLElement | null>(null)
const dropZoneRef = ref<HTMLElement | null>(null)

const params = computed(() => ({
  q: query.value,
  sort_by: sortBy.value,
  order_by: orderBy.value,
  page_size: PAGE_SIZE,
}))

async function loadFiles() {
  await fetchEntities(params.value)
}

const uploadQueue = ref<UploadItem[]>([])

async function uploadFile(file: globalThis.File) {
  const item: UploadItem = {
    id: crypto.randomUUID(),
    name: file.name,
    progress: 0,
    status: "uploading",
  }
  uploadQueue.value.push(item)

  try {
    const response = await filesService.upload(file, (percent) => {
      item.progress = percent
    })
    item.status = "done"
    entities.value = [response.data, ...entities.value]
    toast.success(t("files.upload.uploaded"))
  } catch (e) {
    item.status = "error"
    if (e && typeof e === "object" && "detail" in e)
      item.error = (e as ApiError).detail
    else item.error = t("errors.internal.title")
  }
}

async function handleFiles(incoming: globalThis.File[] | FileList | null) {
  if (!incoming) return
  const arr = Array.from(incoming).filter((f) => f.type === "application/pdf")
  if (arr.length === 0) {
    toast.error(t("files.onlyPdf"))
    return
  }
  await Promise.all(arr.map(uploadFile))
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop: handleFiles,
  dataTypes: ["application/pdf"],
})

function openFilePicker() {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "application/pdf"
  input.multiple = true
  input.onchange = () => handleFiles(input.files)
  input.click()
}

async function handleDownload(id: string) {
  try {
    const response = await filesService.getDownloadUrl(id)
    window.open(response.data.url, "_blank")
  } catch (e) {
    toast.error((e as ApiError).detail)
  }
}

async function handleDelete(id: string) {
  try {
    await filesService.remove(id)
    entities.value = entities.value.filter((f) => f.id !== id)
    toast.success(t("files.delete.deleted"))
  } catch (e) {
    if (e && typeof e === "object" && "detail" in e)
      toast.error((e as ApiError).detail)
    else
      toast.error(t("errors.internal.title"), {
        description: t("errors.internal.detail"),
      })
  }
}

useIntersectionObserver(sentinel, ([entry]) => {
  if (entry?.isIntersecting) loadMore(params.value)
})

watchDebounced(query, loadFiles, { debounce: 400 })
watch([sortBy, orderBy], loadFiles)
onMounted(loadFiles)
</script>

<template>
  <AppLayout>
    <div
      ref="dropZoneRef"
      class="flex flex-col gap-4 min-h-full relative container"
    >
      <div
        v-if="isOverDropZone"
        class="absolute inset-0 z-50 bg-background/80 border-2 border-dashed border-primary rounded-lg flex items-center justify-center"
      >
        <p class="text-primary text-lg font-medium">
          {{ t("files.dropHere") }}
        </p>
      </div>

      <FilesToolbar
        v-model:query="query"
        v-model:order-by="orderBy"
        v-model:sort-by="sortBy"
        v-model:loading="loading"
        @upload-click="openFilePicker"
      />

      <div v-if="uploadQueue.length > 0" class="flex flex-col gap-2">
        <div
          v-for="item in uploadQueue"
          :key="item.id"
          class="flex items-center gap-3 p-3 rounded-lg border"
        >
          <FileIcon
            class="w-4 h-4 shrink-0 text-muted-foreground pointer-events-none"
          />
          <span class="text-sm flex-1 truncate">{{ item.name }}</span>
          <span v-if="item.status === 'error'" class="text-xs text-destructive">
            {{ item.error }}
          </span>
          <Progress
            v-else-if="item.status === 'uploading'"
            :value="item.progress"
            class="w-24"
          />
          <Check v-else class="w-4 h-4 text-green-500 pointer-events-none" />
        </div>
      </div>

      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <Card v-for="n in 6" :key="n" class="p-4 flex flex-col gap-3">
          <Skeleton class="h-5 w-3/4" />
          <Skeleton class="h-3 w-1/2" />
          <Skeleton class="h-3 w-1/3" />
        </Card>
      </div>

      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center gap-4 py-24 text-muted-foreground"
      >
        <p class="text-destructive">{{ error.detail }}</p>
        <Button variant="outline" @click="loadFiles">
          <RefreshCw class="w-4 h-4 mr-2 pointer-events-none" />
          {{ t("common.retry") }}
        </Button>
      </div>

      <div v-else>
        <div
          v-if="entities.length === 0"
          class="flex flex-col items-center justify-center gap-4 py-24 text-muted-foreground"
        >
          <Files class="w-12 h-12" />
          <p>{{ t("files.empty") }}</p>
          <Button @click="openFilePicker">
            {{ t("files.upload.first") }}
          </Button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <FileCard
            v-for="file in entities"
            :key="file.id"
            :file="file"
            @download="handleDownload"
            @delete="handleDelete"
          />
        </div>

        <div ref="sentinel" class="h-1" />
        <div v-if="loadingMore" class="flex justify-center py-4">
          <Spinner />
        </div>
      </div>
    </div>
  </AppLayout>
</template>
