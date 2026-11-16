
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Formulario listo. Falta conectar la autenticación del backend.')
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

          <button className="button button-primary" type="submit">
            Ingresar
          </button>

          {message && <p role="status">{message}</p>}

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
