import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

const STORAGE_KEYS = {
  token: 'token',
  user: 'user',
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || 'null')
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.token) || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.token, token)
    } else {
      localStorage.removeItem(STORAGE_KEYS.token)
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.user)
    }
  }, [user])

  const isAuthenticated = Boolean(token && user)
  const role = user?.role || null

  const login = async (authResponse) => {
    const nextToken = authResponse?.token || ''
    const nextUser = {
      email: authResponse?.email || null,
      role: authResponse?.role || null,
      fullName: authResponse?.fullName || null,
    }

    setToken(nextToken)
    setUser(nextUser)

    if (nextToken && nextUser.role === 'ADMIN') {
      navigate('/admin', { replace: true })
      return
    }

    if (nextToken) {
      navigate('/', { replace: true })
    }
  }

  const logout = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.user)
    navigate('/login', { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      isAuthenticated,
      login,
      logout,
      setUser,
      setToken,
    }),
    [user, token, role, isAuthenticated, navigate],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}

export default AuthContext
