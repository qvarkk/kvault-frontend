<script setup lang="ts">
import { useI18n } from "vue-i18n"
import {
  Dialog,
  DialogScrollContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { FileText } from "lucide-vue-next"

defineProps<{
  text?: string
}>()

const open = defineModel<boolean>("open", { default: false })

const { t } = useI18n()
</script>

<template>
  <Dialog v-model:open="open">
    <DialogScrollContent class="w-[calc(100vw-1rem)] max-w-2xl">
      <DialogHeader>
        <DialogTitle>{{ t("notes.info.extractedText.title") }}</DialogTitle>
        <DialogDescription>
          {{ t("notes.info.extractedText.description") }}
        </DialogDescription>
      </DialogHeader>

      <div
        v-if="text && text.trim()"
        class="text-sm whitespace-pre-wrap break-words leading-relaxed text-muted-foreground max-h-[60vh] overflow-y-auto"
      >
        {{ text }}
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground"
      >
        <FileText class="w-8 h-8" />
        <p class="text-sm">{{ t("notes.info.extractedText.empty") }}</p>
      </div>
    </DialogScrollContent>
  </Dialog>
</template>
