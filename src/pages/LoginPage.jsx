import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const authData = await authService.login({
        email: email.trim(),
        password,
      })
      await login(authData)
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'No pudimos iniciar sesión. Verifica tus credenciales.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="container" style={{ maxWidth: 520 }}>
        <div className="page-heading">
          <p className="eyebrow">Bienvenido a Aurum Bakery</p>
          <h1>Iniciar sesión</h1>
          <p>Accede con tu correo y contraseña.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="login-email">Correo electrónico</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <p style={{ marginTop: '1rem' }}>
            ¿Aún no tienes cuenta?{' '}
            <a href="#/register" className="text-button">
              Crear cuenta
            </a>
          </p>
        </form>
      </section>
    </main>
  )
}
