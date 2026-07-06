import { useEffect, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { Todo } from '../types'
import { formatCreatedAt } from '../utils/formatDate'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onUpdate: (id: number, title: string, completed: boolean) => Promise<void>
  onDelete: (id: number) => void
}

function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEditing) {
      setEditTitle(todo.title)
    }
  }, [todo.title, isEditing])

  const startEdit = () => {
    setEditTitle(todo.title)
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setEditTitle(todo.title)
    setIsEditing(false)
  }

  const saveEdit = async () => {
    const title = editTitle.trim()
    if (!title || saving) return
    if (title === todo.title) {
      setIsEditing(false)
      return
    }

    setSaving(true)
    try {
      await onUpdate(todo.id, title, todo.completed)
      setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    void saveEdit()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <li className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
      {isEditing ? (
        <form className="todo-item__edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={saving}
            aria-label="Chỉnh sửa nội dung công việc"
          />
          <div className="todo-item__edit-actions">
            <button type="submit" className="btn-save" disabled={saving || !editTitle.trim()}>
              Lưu
            </button>
            <button type="button" className="btn-cancel" onClick={cancelEdit} disabled={saving}>
              Hủy
            </button>
          </div>
        </form>
      ) : (
        <>
          <label className="todo-item__label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className="todo-item__content">
              <span className="todo-item__title">{todo.title}</span>
              <span className="todo-item__created">{formatCreatedAt(todo.createdAt)}</span>
            </span>
          </label>
          <div className="todo-item__actions">
            <button
              type="button"
              className="todo-item__edit-btn"
              onClick={startEdit}
              aria-label="Chỉnh sửa công việc"
            >
              ✎
            </button>
            <button
              type="button"
              className="todo-item__delete"
              onClick={() => onDelete(todo.id)}
              aria-label="Xóa công việc"
            >
              ×
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem
