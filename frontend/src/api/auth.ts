import { apiFetch, setToken } from './http'

export interface AuthResponse {
  token: string
  username: string
}

export async function login(
  username: string,
  password: string,
): Promise<AuthResponse> {
  const res = await apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  setToken(res.token)
  return res
}

export async function register(
  username: string,
  password: string,
): Promise<AuthResponse> {
  const res = await apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  setToken(res.token)
  return res
}
