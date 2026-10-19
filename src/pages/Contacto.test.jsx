import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contacto from './Contacto'

describe('Página de Contacto', () => {
  it('renderiza la información de contacto y horarios', () => {
    render(<Contacto />)
    expect(screen.getByText(/hola@aurumbakery.cl/i)).toBeInTheDocument()
    expect(screen.getByText(/09:00 a 19:00/i)).toBeInTheDocument()
  })

  it('exige los campos obligatorios y valida el formato del correo', () => {
    render(<Contacto />)

    const nombre = screen.getByLabelText(/Nombre completo/i)
    const correo = screen.getByLabelText(/Correo electrónico/i)
    const mensaje = screen.getByLabelText(/Cuéntanos más/i)

    expect(nombre).toBeRequired()
    expect(correo).toBeRequired()
    expect(mensaje).toBeRequired()

    expect(nombre).toBeInvalid()
    expect(correo).toBeInvalid()
    expect(mensaje).toBeInvalid()

    fireEvent.change(correo, { target: { value: 'alejandra' } })
    expect(correo).toBeInvalid()

    fireEvent.change(correo, {
      target: { value: 'alejandra@ejemplo.com' },
    })
    expect(correo).toBeValid()
  })

  it('muestra el mensaje de confirmación al simular el envío del formulario', () => {
    render(<Contacto />)
    
    // 1. Llenamos los campos obligatorios primero
    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Juan Perez' } })
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'juan@ejemplo.com' } })
    fireEvent.change(screen.getByLabelText(/Cuéntanos más/i), { target: { value: 'Cotización de prueba' } })
    
    // 2. Hacemos clic en enviar
    const submitButton = screen.getByRole('button', { name: /Enviar consulta/i })
    fireEvent.click(submitButton)
    
    // 3. Verificamos el resultado
    expect(screen.getByText(/Gracias por escribirnos/i)).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
  'Simulación completada. Tu consulta no se ha enviado ni guardado.'
)
  })
})