import { useState } from 'react'
import type { Todo } from './types'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const remaining = todos.filter((todo) => !todo.completed).length

  return (
    <main className="app">
      <section className="todo-card">
        <header className="todo-header">
          <h1>Danh sách công việc</h1>
          <p className="todo-subtitle">
            Còn lại {remaining} / {todos.length} việc cần làm
          </p>
        </header>

        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </section>
    </main>
  )
}

export default App
