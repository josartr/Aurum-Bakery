import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.login(form)
      const role = response?.role

      localStorage.setItem('token', response.token)
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: response.email,
          role,
          fullName: response.fullName,
        }),
      )

      await login(response)

      if (role === 'ADMIN') {
        navigate('/admin', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Credenciales inválidas. Intenta nuevamente.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page auth-page">
      <section className="container auth-card">
        <div className="auth-header">
          <p className="eyebrow">Aurum Bakery</p>
          <h1>Inicia sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </label>

          <label>
            <span>Contraseña</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </section>
    </main>
  )
}
