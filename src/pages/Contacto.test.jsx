import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Contacto from './Contacto'
import { contactService } from '../services'

vi.mock('../services', () => ({
  contactService: {
    send: vi.fn().mockResolvedValue({ data: { id: 1 } }),
  },
}))

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

  it('muestra el mensaje de confirmación al enviar el formulario', async () => {
    render(<Contacto />)

    fireEvent.change(screen.getByLabelText(/Nombre completo/i), { target: { value: 'Juan Perez' } })
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'juan@ejemplo.com' } })
    fireEvent.change(screen.getByLabelText(/Cuéntanos más/i), { target: { value: 'Cotización de prueba' } })

    const submitButton = screen.getByRole('button', { name: /Enviar consulta/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/Gracias por escribirnos/i)
    })
    expect(contactService.send).toHaveBeenCalledTimes(1)
  })
})
