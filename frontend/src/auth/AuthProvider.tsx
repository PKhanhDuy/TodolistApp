import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import * as authApi from '../api/auth'
import { clearToken, getToken, setUnauthorizedHandler } from '../api/http'
import { AuthContext, type AuthContextValue } from './AuthContext'

const USERNAME_KEY = 'todo_username'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(() =>
    getToken() ? localStorage.getItem(USERNAME_KEY) : null,
  )

  useEffect(() => {
    setUnauthorizedHandler(() => {
      localStorage.removeItem(USERNAME_KEY)
      setUsername(null)
    })
    return () => setUnauthorizedHandler(null)
  }, [])

  const login = useCallback(async (u: string, p: string) => {
    const res = await authApi.login(u, p)
    localStorage.setItem(USERNAME_KEY, res.username)
    setUsername(res.username)
  }, [])

  const register = useCallback(async (u: string, p: string) => {
    const res = await authApi.register(u, p)
    localStorage.setItem(USERNAME_KEY, res.username)
    setUsername(res.username)
  }, [])

  const logout = useCallback(() => {
    clearToken()
    localStorage.removeItem(USERNAME_KEY)
    setUsername(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      username,
      isAuthenticated: username !== null,
      login,
      register,
      logout,
    }),
    [username, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
