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

const router = useRouter()

const props = defineProps<{
  note: Note
}>()
</script>

<template>
  <a
    :href="`/notes/${note.id}`"
    @click.prevent="router.push({ name: 'note', params: { id: note.id } })"
  >
    <Card
      class="group flex flex-col gap-3 p-4 h-full cursor-pointer hover:bg-accent transition-colors"
    >
      <CardHeader class="p-0">
        <CardTitle class="text-base group-hover:underline">{{
          note.title
        }}</CardTitle>
      </CardHeader>

      <CardContent class="p-0 text-sm text-muted-foreground flex-1">
        {{
          note.content.slice(0, 100) + (note.content.length > 100 ? "..." : "")
        }}
      </CardContent>

      <CardFooter class="p-0 flex items-center justify-between">
        <div class="flex gap-1 flex-wrap">
          <Badge v-for="tag in note.tags" :key="tag.id" variant="secondary">
            {{ tag.name }}
          </Badge>
        </div>
        <span class="text-xs text-muted-foreground">{{
          timeAgo(note.updatedAt)
        }}</span>
      </CardFooter>
    </Card>
  </a>
</template>
