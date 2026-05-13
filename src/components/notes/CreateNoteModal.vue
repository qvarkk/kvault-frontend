<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { notesService } from "@/services/notes"
import type { ApiError } from "@/types"
import { toast } from "vue-sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const { t } = useI18n()
const router = useRouter()

const open = defineModel<boolean>("open")
const title = ref("")
const loading = ref(false)

async function handleCreate() {
  if (!title.value.trim()) return
  loading.value = true

  try {
    const response = await notesService.createText(title.value.trim())
    toast.success(t("notes.create.created"))
    open.value = false
    title.value = ""
    router.push({ name: "note", params: { id: response.data.id } })
  } catch (e) {
    if (e && typeof e === "object" && "detail" in e)
      toast.error((e as ApiError).detail)
    else
      toast.error(t("errors.internal.title"), {
        description: t("errors.internal.detail"),
      })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent aria-describedby="">
      <DialogHeader>
        <DialogTitle>{{ t("notes.create.title") }}</DialogTitle>
      </DialogHeader>
      <Input
        v-model="title"
        :placeholder="t('notes.create.placeholder')"
        @keydown.enter="handleCreate"
      />
      <DialogFooter>
        <Button variant="outline" @click="open = false">
          {{ t("common.cancel") }}
        </Button>
        <Button @click="handleCreate" :disabled="loading || !title.trim()">
          {{ loading ? t("common.creating") : t("common.create") }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
