<script setup lang="ts">
import { ArrowDown, ArrowUp, SearchIcon, Upload } from "lucide-vue-next"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Spinner } from "../ui/spinner"
import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const query = defineModel<string>("query", { default: "" })
const sortBy = defineModel<string>("sortBy", { default: "" })
const orderBy = defineModel<string>("orderBy", { default: "" })
const loading = defineModel<boolean>("loading", { default: false })

const emits = defineEmits<{
  uploadClick: []
}>()

function toggleOrder() {
  orderBy.value = orderBy.value === "DESC" ? "ASC" : "DESC"
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <InputGroup>
      <InputGroupInput v-model="query" :placeholder="t('files.search')" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon v-if="loading" align="inline-end">
        <Spinner />
      </InputGroupAddon>
    </InputGroup>

    <div class="flex items-center gap-2">
      <ButtonGroup class="flex flex-1">
        <Button variant="outline" size="icon" @click="toggleOrder">
          <ArrowUp
            v-if="orderBy === 'ASC'"
            class="w-4 h-4 pointer-events-none"
          />
          <ArrowDown v-else class="w-4 h-4 pointer-events-none" />
        </Button>
        <Select v-model="sortBy">
          <SelectTrigger class="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">
              {{ t("files.sort.createdAt") }}
            </SelectItem>
            <SelectItem value="original_name">
              {{ t("files.sort.name") }}
            </SelectItem>
            <SelectItem value="size">{{ t("files.sort.size") }}</SelectItem>
          </SelectContent>
        </Select>
      </ButtonGroup>
      <Button @click="emits('uploadClick')">
        <Upload class="w-4 h-4 mr-2 pointer-events-none" />
        {{ t("common.upload") }}
      </Button>
    </div>
  </div>
</template>
