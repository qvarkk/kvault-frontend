export interface Listed<T> {
  data: T[]
}

export interface Paginated<T> extends Listed<T> {
  page: number
  page_size: number
  total: number
}