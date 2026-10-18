import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
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
    expect(screen.getByText(/\$\s*440\.000/)).toBeInTheDocument()
  })

  it('permite cambiar el tipo de servicio de logística', () => {
    render(<Eventos onNavigate={() => {}} />)
    const selectService = screen.getByLabelText(/Logística/i)
    fireEvent.change(selectService, { target: { value: 'retiro' } })
    expect(selectService.value).toBe('retiro')
    expect(screen.getByText(/\$\s*255\.000/)).toBeInTheDocument()
  })

    it('solicita navegar a contacto al pedir una cotización', () => {
    const onNavigate = vi.fn()
    render(<Eventos onNavigate={onNavigate} />)

    const submitButton = screen.getByRole('button', {
      name: /Solicitar cotización formal/i,
    })
    fireEvent.click(submitButton)

    expect(onNavigate).toHaveBeenCalledWith('contacto')
  })
  
})