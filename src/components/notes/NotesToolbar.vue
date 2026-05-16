<script setup lang="ts">
import { ArrowDown, ArrowUp, SearchIcon } from "lucide-vue-next"
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
import { ButtonGroup } from "../ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Spinner } from "../ui/spinner"

const { t } = useI18n()

const query = defineModel<string>("query", { default: "" })
const sortBy = defineModel<string>("sortBy", { default: "" })
const orderBy = defineModel<string>("orderBy", { default: "" })
const tagIds = defineModel<string[]>("tagIds", { default: [] })
const loading = defineModel<boolean>("loading", { default: false })

function toggleOrder() {
  orderBy.value = orderBy.value === "DESC" ? "ASC" : "DESC"
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <InputGroup>
      <InputGroupInput v-model="query" :placeholder="t('notes.search')" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon v-if="loading" align="inline-end">
        <Spinner />
      </InputGroupAddon>
    </InputGroup>

    <div class="flex items-center gap-2 md:gap-4">
      <ButtonGroup class="flex flex-1">
        <Button variant="outline" size="icon" @click="toggleOrder">
          <ArrowUp v-if="orderBy === 'ASC'" class="w-4 h-4" />
          <ArrowDown v-else class="w-4 h-4" />
        </Button>

        <Select v-model:model-value="sortBy">
          <SelectTrigger class="flex-1">
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
      </ButtonGroup>

      <div class="flex-1">
        <TagFilter v-model:tag-ids="tagIds" />
      </div>
    </div>
  </div>
</template>
