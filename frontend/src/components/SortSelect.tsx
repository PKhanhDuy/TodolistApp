import { useEffect, useRef, useState } from 'react'
import type { SortOption } from '../types'
import { SORT_OPTIONS } from '../types'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

function SortSelect({ value, onChange }: SortSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const selectedLabel =
    SORT_OPTIONS.find((option) => option.value === value)?.label ?? 'Sắp xếp'

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const handleSelect = (option: SortOption) => {
    onChange(option)
    setOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={`todo-sort-dropdown ${open ? 'is-open' : ''}`}
    >
      <button
        type="button"
        className="todo-sort-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sắp xếp công việc"
      >
        <span>{selectedLabel}</span>
        <span className="todo-sort-chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul className="todo-sort-menu" role="listbox" aria-label="Tùy chọn sắp xếp">
          {SORT_OPTIONS.map(({ value: optionValue, label }) => (
            <li key={optionValue} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === optionValue}
                className={`todo-sort-option ${value === optionValue ? 'is-active' : ''}`}
                onClick={() => handleSelect(optionValue)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SortSelect
