import type { StatusFilter } from '../types'

interface TodoToolbarProps {
  search: string
  status: StatusFilter
  onSearchChange: (value: string) => void
  onStatusChange: (status: StatusFilter) => void
}

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'active', label: 'Chưa xong' },
  { value: 'completed', label: 'Đã xong' },
]

function TodoToolbar({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: TodoToolbarProps) {
  return (
    <div className="todo-toolbar">
      <input
        type="search"
        className="todo-search"
        placeholder="Tìm kiếm công việc..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Tìm kiếm công việc"
      />
      <div className="todo-filters" role="group" aria-label="Lọc theo trạng thái">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`todo-filter ${status === value ? 'is-active' : ''}`}
            onClick={() => onStatusChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TodoToolbar
