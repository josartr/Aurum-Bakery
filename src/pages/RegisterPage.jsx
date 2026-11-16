import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
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
      await authService.register(form)
      navigate('/login', { replace: true })
    } catch (err) {
      const message = err?.response?.data?.message || 'No se pudo completar el registro.'
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
          <h1>Crear cuenta</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Nombre completo</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"
            />
          </label>

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
              placeholder="Mínimo 8 caracteres"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  )
}
