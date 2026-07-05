import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="app">
      <div className="card">
        <h1>React + TypeScript + Docker</h1>
        <p>Khung dự án cơ bản đã sẵn sàng.</p>
        <button onClick={() => setCount((c) => c + 1)}>
          Đã bấm {count} lần
        </button>
        <p className="hint">
          Chỉnh sửa <code>src/App.tsx</code> và lưu để thử hot reload.
        </p>
      </div>
    </main>
  )
}

export default App
