import { useState, type FormEvent } from 'react'

interface TodoInputProps {
  onAdd: (title: string) => void
}

function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const title = value.trim()
    if (!title) return
    onAdd(title)
    setValue('')
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Bạn cần làm gì?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Nội dung công việc"
      />
      <button type="submit">Thêm</button>
    </form>
  )
}

export default TodoInput
