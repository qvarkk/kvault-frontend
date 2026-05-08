export interface Tag {
  id: string
  userId: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface TagRef {
  id: string
  name: string
}

export interface TagCreatePayload {
  name: string
}

export type TagUpdatePayload = TagCreatePayload