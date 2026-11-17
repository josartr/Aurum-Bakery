import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services'

export default function RegisterPage() {
  const { login } = useAuth()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (nombre.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      const authData = await authService.register({
        fullName: nombre.trim(),
        email: email.trim(),
        password,
      })
      await login(authData)
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'No pudimos crear tu cuenta. Intenta nuevamente.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="container" style={{ maxWidth: 520 }}>
        <div className="page-heading">
          <p className="eyebrow">Únete a Aurum Bakery</p>
          <h1>Crear cuenta</h1>
          <p>Regístrate para disfrutar de nuestras creaciones.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="registro-nombre">Nombre completo</label>
            <input
              id="registro-nombre"
              type="text"
              minLength={2}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="registro-email">Correo electrónico</label>
            <input
              id="registro-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="registro-password">Contraseña</label>
            <input
              id="registro-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="registro-confirmar">Confirmar contraseña</label>
            <input
              id="registro-confirmar"
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
            />
          </div>

          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <p style={{ marginTop: '1rem' }}>
            ¿Ya tienes una cuenta?{' '}
            <a href="#/login" className="text-button">
              Iniciar sesión
            </a>
          </p>
        </form>
      </section>
    </main>
  )
}
