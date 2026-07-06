import type { Todo } from '../types'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  hasFilters: boolean
  onToggle: (id: number) => void
  onUpdate: (id: number, title: string, completed: boolean) => Promise<void>
  onDelete: (id: number) => void
}

function TodoList({ todos, hasFilters, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="todo-empty">
        {hasFilters
          ? 'Không tìm thấy công việc phù hợp.'
          : 'Chưa có công việc nào. Hãy thêm việc đầu tiên!'}
      </p>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
