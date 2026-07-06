export interface Todo {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export type StatusFilter = 'all' | 'active' | 'completed'

export interface PaginatedTodos {
  content: Todo[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export interface TodoStats {
  total: number
  completed: number
}

export const PAGE_SIZE = 7
