<script setup lang="ts">
import { ArrowDown, ArrowUp, Search } from "lucide-vue-next"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import type { AcceptableValue } from "reka-ui"
import { useI18n } from "vue-i18n"
import TagFilter from "./TagFilter.vue"

const { t } = useI18n()

const props = defineProps<{
  query: string
  sortBy: string
  orderBy: string
  tagIds: string[]
}>()

const emit = defineEmits<{
  "update:query": [value: string]
  "update:sortBy": [value: string]
  "update:orderBy": [value: string]
  "update:tagIds": [value: string[]]
}>()

function handleSortUpdate(value: AcceptableValue) {
  if (typeof value === "string") {
    emit("update:sortBy", value)
  }
}

function toggleOrder() {
  emit("update:orderBy", props.orderBy === "DESC" ? "ASC" : "DESC")
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="relative flex-1">
      <Search
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
      />
      <Input
        :value="query"
        @input="emit('update:query', ($event.target as HTMLInputElement).value)"
        :placeholder="t('notes.search')"
        class="pl-9"
      />
    </div>

    <div class="flex items-center gap-2">
      <Select :model-value="sortBy" @update:model-value="handleSortUpdate">
        <SelectTrigger class="w-40 flex-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updated_at">
            {{ t("notes.sort.updatedAt") }}
          </SelectItem>
          <SelectItem value="created_at">
            {{ t("notes.sort.createdAt") }}
          </SelectItem>
          <SelectItem value="title">{{ t("notes.sort.title") }}</SelectItem>
        </SelectContent>
      </Select>

      <div class="flex-1">
        <TagFilter :model-value="tagIds" />
      </div>

      <Button variant="outline" size="icon" @click="toggleOrder">
        <ArrowUp v-if="orderBy === 'ASC'" class="w-4 h-4" />
        <ArrowDown v-else class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
