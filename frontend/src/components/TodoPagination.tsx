interface TodoPaginationProps {
  page: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
}

function TodoPagination({
  page,
  totalPages,
  totalElements,
  onPageChange,
}: TodoPaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i)

  return (
    <nav className="todo-pagination" aria-label="Phân trang danh sách công việc">
      <p className="todo-pagination__info">
        Trang {page + 1}/{totalPages} · {totalElements} việc
      </p>
      <div className="todo-pagination__controls">
        <button
          type="button"
          className="todo-pagination__btn"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
        >
          ← Trước
        </button>
        <div className="todo-pagination__pages">
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              className={`todo-pagination__page ${p === page ? 'is-active' : ''}`}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p + 1}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="todo-pagination__btn"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
        >
          Sau →
        </button>
      </div>
    </nav>
  )
}

export default TodoPagination
