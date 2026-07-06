import type { PaginatedTodos, SortOption, StatusFilter, Todo, TodoStats } from '../types'
import { PAGE_SIZE, parseSortOption } from '../types'
import { apiFetch } from './http'

function statusToParam(status: StatusFilter): boolean | undefined {
  if (status === 'active') return false
  if (status === 'completed') return true
  return undefined
}

export function fetchTodos(
  search = '',
  status: StatusFilter = 'all',
  page = 0,
  sort: SortOption = 'createdAt-desc',
): Promise<PaginatedTodos> {
  const params = new URLSearchParams()
  const trimmed = search.trim()
  if (trimmed) params.set('search', trimmed)
  const completed = statusToParam(status)
  if (completed !== undefined) params.set('completed', String(completed))
  params.set('page', String(page))
  params.set('size', String(PAGE_SIZE))

  const { sortBy, sortDir } = parseSortOption(sort)
  params.set('sortBy', sortBy)
  params.set('sortDir', sortDir)

  return apiFetch<PaginatedTodos>(`/todos?${params.toString()}`)
}

export function fetchTodoStats(): Promise<TodoStats> {
  return apiFetch<TodoStats>('/todos/stats')
}

export function createTodo(title: string): Promise<Todo> {
  return apiFetch<Todo>('/todos', {
    method: 'POST',
    body: JSON.stringify({ title }),
  })
}

export function updateTodo(
  id: number,
  title: string,
  completed: boolean,
): Promise<Todo> {
  return apiFetch<Todo>(`/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, completed }),
  })
}

export function toggleTodo(id: number): Promise<Todo> {
  return apiFetch<Todo>(`/todos/${id}/toggle`, { method: 'PATCH' })
}

export function deleteTodo(id: number): Promise<void> {
  return apiFetch<void>(`/todos/${id}`, { method: 'DELETE' })
}
