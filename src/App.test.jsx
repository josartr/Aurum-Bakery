import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HashRouter } from 'react-router-dom'
import App from './App'

describe('Recorrido de cotización', () => {
  it('navega desde Inicio y completa Contacto con el presupuesto', () => {
    window.history.replaceState({}, '', '#/inicio')

    const scrollMock = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => {})

    try {
      render(
        <HashRouter>
          <App />
        </HashRouter>
      )

      expect(
        screen.getByRole('heading', { level: 1 })
      ).toHaveTextContent(/Pequeños momentos/i)

      expect(screen.getByRole('contentinfo')).toBeInTheDocument()

      fireEvent.click(
        screen.getByRole('button', {
          name: /Planifica tu celebración/i,
        })
      )

      expect(window.location.hash).toBe('#/eventos')

      fireEvent.change(
        screen.getByLabelText(/Número de invitados/i),
        { target: { value: '50' } }
      )

      fireEvent.click(
        screen.getByRole('button', {
          name: /Solicitar cotización formal/i,
        })
      )

      expect(window.location.hash).toBe('#/contacto')

      const mensaje = screen.getByLabelText(/Cuéntanos más/i)

      expect(mensaje.value).toContain('Mesa dulce')
      expect(mensaje.value).toContain('50 invitados')
      expect(mensaje.value).toContain('Despacho programado')
      expect(mensaje.value).toMatch(/\$\s*440\.000/)
    } finally {
      scrollMock.mockRestore()
      window.history.replaceState({}, '', '/')
    }
  })
})