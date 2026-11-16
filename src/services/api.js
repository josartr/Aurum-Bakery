import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    if (status === 401 || status === 403) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      const isLoginPage = window.location.pathname === '/login' || window.location.hash === '#/login'

      if (!isLoginPage) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)

export default api
