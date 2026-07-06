export interface Todo {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export type StatusFilter = 'all' | 'active' | 'completed'

export type SortOption =
  | 'createdAt-desc'
  | 'createdAt-asc'
  | 'title-asc'
  | 'title-desc'

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'createdAt-desc', label: 'Ngày tạo (mới nhất)' },
  { value: 'createdAt-asc', label: 'Ngày tạo (cũ nhất)' },
  { value: 'title-asc', label: 'Tên (A → Z)' },
  { value: 'title-desc', label: 'Tên (Z → A)' },
]

export function parseSortOption(option: SortOption): { sortBy: string; sortDir: string } {
  const [sortBy, sortDir] = option.split('-') as [string, string]
  return { sortBy, sortDir }
}

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
