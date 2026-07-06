import type { SortOption, StatusFilter } from '../types'
import { SORT_OPTIONS } from '../types'

interface TodoToolbarProps {
  search: string
  status: StatusFilter
  sort: SortOption
  onSearchChange: (value: string) => void
  onStatusChange: (status: StatusFilter) => void
  onSortChange: (sort: SortOption) => void
}

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'active', label: 'Chưa xong' },
  { value: 'completed', label: 'Đã xong' },
]

function TodoToolbar({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
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
      <label className="todo-sort">
        <span>Sắp xếp</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Sắp xếp công việc"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default TodoToolbar
