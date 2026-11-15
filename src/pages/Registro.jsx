
import { useState } from 'react'

export default function Registro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [mensaje, setMensaje] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (password.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (password !== confirmar) {
      setMensaje('Las contraseñas no coinciden.')
      return
    }

    setMensaje(
      'Datos validados correctamente. El registro estará disponible al conectar el backend.'
    )
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
              minLength={8}
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

          <button className="button button-primary" type="submit">
            Verificar datos
          </button>

          {mensaje && <p role="status">{mensaje}</p>}
        </form>
      </section>
    </main>
  )
}
