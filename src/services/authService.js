import api from './api'

const AUTH_KEY = 'token'
const USER_KEY = 'user'

function persistSession(data) {
  if (data?.token) {
    localStorage.setItem(AUTH_KEY, data.token)
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        email: data.email,
        role: data.role,
        fullName: data.fullName,
      }),
    )
  }
}

export const authService = {
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials)
    persistSession(data)
    return data
  },

  async register(payload) {
    const { data } = await api.post('/auth/register', payload)
    persistSession(data)
    return data
  },

  logout() {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
    } catch {
      return null
    }
  },

  isAdmin() {
    return this.getCurrentUser()?.role === 'ADMIN'
  },
}

export default authService
