import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Eventos from './Eventos'

describe('Página de Eventos y Calculadora', () => {
  it('renderiza la sección de la calculadora de presupuestos', () => {
    render(<Eventos onNavigate={() => {}} />)
    expect(screen.getByText(/Calcula un presupuesto/i)).toBeInTheDocument()
  })

  it('permite cambiar la cantidad de invitados', () => {
    render(<Eventos onNavigate={() => {}} />)
    const inputGuests = screen.getByLabelText(/Número de invitados/i)
    fireEvent.change(inputGuests, { target: { value: '50' } })
    expect(inputGuests.value).toBe('50')
  })

  it('permite cambiar el tipo de servicio de logística', () => {
    render(<Eventos onNavigate={() => {}} />)
    const selectService = screen.getByLabelText(/Logística/i)
    fireEvent.change(selectService, { target: { value: 'retiro' } })
    expect(selectService.value).toBe('retiro')
  })

  it('muestra mensaje de éxito al hacer clic en solicitar cotización', () => {
    render(<Eventos onNavigate={() => {}} />)
    const submitButton = screen.getByRole('button', { name: /Solicitar cotización formal/i })
    fireEvent.click(submitButton)
    expect(screen.getByText(/prepararemos una propuesta a tu medida/i)).toBeInTheDocument()
  })
})