import type { TagRef } from "./tag"

export type ItemType = 'text' | 'url'

export interface Item {
  id: string
  userId: string
  title: string
  content: string
  type: ItemType
  tags: TagRef[]
  updatedAt: string
  createdAt: string
}

export interface ItemCreatePayload {
  title: string
  content?: string
  type: ItemType
}

export interface ItemUpdatePayload {
  title?: string
  content?: string
}

export interface BindTagPayload {
  tagId: string
}