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
import { useI18n } from "vue-i18n"
import TagFilter from "./TagFilter.vue"

const { t } = useI18n()

const query = defineModel<string>("query", { default: "" })
const sortBy = defineModel<string>("sortBy", { default: "" })
const orderBy = defineModel<string>("orderBy", { default: "" })
const tagIds = defineModel<string[]>("tagIds", { default: [] })

function toggleOrder() {
  orderBy.value = orderBy.value === "DESC" ? "ASC" : "DESC"
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="relative flex-1">
      <Search
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
      />
      <Input v-model="query" :placeholder="t('notes.search')" class="pl-9" />
    </div>

    <div class="flex items-center gap-2">
      <Button variant="outline" size="icon" @click="toggleOrder">
        <ArrowUp v-if="orderBy === 'ASC'" class="w-4 h-4" />
        <ArrowDown v-else class="w-4 h-4" />
      </Button>

      <Select v-model:model-value="sortBy">
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
        <TagFilter v-model:tag-ids="tagIds" />
      </div>
    </div>
  </div>
</template>
