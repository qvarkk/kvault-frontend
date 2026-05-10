import type { TagRef } from "./tag"

export type NoteType = "text" | "url"

export interface Note {
  id: string
  userId: string
  title: string
  content: string
  type: NoteType
  tags: TagRef[]
  updatedAt: string
  createdAt: string
}

export interface NoteCreatePayload {
  title: string
  content?: string
  type: NoteType
}

export interface NoteUpdatePayload {
  title?: string
  content?: string
}

export interface BindTagPayload {
  tagId: string
}
