import { useCallback, useEffect, useState } from 'react'
import type { StatusFilter, Todo } from '../types'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import TodoPagination from '../components/TodoPagination'
import TodoToolbar from '../components/TodoToolbar'
import * as todosApi from '../api/todos'
import { useAuth } from '../auth/AuthContext'

function TodoPage() {
  const { username, logout } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [filteredTotal, setFilteredTotal] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadStats = useCallback(async () => {
    const stats = await todosApi.fetchTodoStats()
    setTotalCount(stats.total)
    setCompletedCount(stats.completed)
  }, [])

  const loadTodos = useCallback(async (targetPage: number) => {
    const result = await todosApi.fetchTodos(search, status, targetPage)
    setTodos(result.content)
    setPage(result.page)
    setTotalPages(result.totalPages)
    setFilteredTotal(result.totalElements)
  }, [search, status])

  useEffect(() => {
    loadStats().catch((err: Error) => setError(err.message))
  }, [loadStats])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      loadTodos(page)
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false))
    }, search ? 300 : 0)

    return () => clearTimeout(timer)
  }, [loadTodos, page, search])

  const refreshAll = async (targetPage = page) => {
    await Promise.all([loadStats(), loadTodos(targetPage)])
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(0)
  }

  const handleStatusChange = (value: StatusFilter) => {
    setStatus(value)
    setPage(0)
  }

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
  }

  const addTodo = async (title: string) => {
    try {
      await todosApi.createTodo(title)
      await refreshAll(0)
      setPage(0)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const updateTodo = async (id: number, title: string, completed: boolean) => {
    try {
      const updated = await todosApi.updateTodo(id, title, completed)
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)))
      await loadStats()
      setError(null)
    } catch (err) {
      setError((err as Error).message)
      throw err
    }
  }

  const toggleTodo = async (id: number) => {
    try {
      await todosApi.toggleTodo(id)
      await Promise.all([loadStats(), loadTodos(page)])
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const deleteTodo = async (id: number) => {
    const snapshot = todos
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    try {
      await todosApi.deleteTodo(id)
      const nextPage = todos.length === 1 && page > 0 ? page - 1 : page
      setPage(nextPage)
      await refreshAll(nextPage)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
      setTodos(snapshot)
    }
  }

  const remaining = totalCount - completedCount
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)
  const hasFilters = search.trim() !== '' || status !== 'all'

  return (
    <main className="app">
      <section className="todo-card">
        <div className="todo-topbar">
          <span className="todo-user">
            Xin chào, <strong>{username}</strong>
          </span>
          <button type="button" className="btn-ghost" onClick={logout}>
            Đăng xuất
          </button>
        </div>

        <header className="todo-header">
          <h1>Danh sách công việc</h1>
          <p className="todo-subtitle">
            {totalCount === 0
              ? 'Chưa có việc nào'
              : `Hoàn thành ${completedCount}/${totalCount} · còn lại ${remaining} việc`}
          </p>
          <div
            className="todo-progress"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="todo-progress__bar" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <TodoInput onAdd={addTodo} />
        <TodoToolbar
          search={search}
          status={status}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
        />

        {error && <p className="todo-error">{error}</p>}

        {loading ? (
          <p className="todo-empty">Đang tải...</p>
        ) : (
          <>
            <TodoList
              todos={todos}
              hasFilters={hasFilters}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
            <TodoPagination
              page={page}
              totalPages={totalPages}
              totalElements={filteredTotal}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </main>
  )
}

export default TodoPage
