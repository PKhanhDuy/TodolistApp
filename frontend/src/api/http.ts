const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

const TOKEN_KEY = 'todo_token'

let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken()
  const headers = new Headers(options.headers)
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })

  if (res.status === 401) {
    let message = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại'
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      // giữ message mặc định
    }
    // Chỉ tự đăng xuất khi token cũ hết hạn (không áp dụng cho trang đăng nhập)
    if (token && !path.startsWith('/auth/')) {
      clearToken()
      onUnauthorized?.()
    }
    throw new Error(message)
  }

  if (!res.ok) {
    let message = `Yêu cầu thất bại (HTTP ${res.status})`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {
      // giữ message mặc định
    }
    throw new Error(message)
  }

  if (res.status === 204) {
    return undefined as T
  }
  return res.json() as Promise<T>
}
