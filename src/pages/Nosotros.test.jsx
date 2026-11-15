import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Nosotros from './Nosotros'

describe('Página Acerca de nosotros', () => {
  it('muestra la historia, pilares cálidos e ingredientes nobles de Aurum Bakery', () => {
    const onNavigate = vi.fn()
    render(<Nosotros onNavigate={onNavigate} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Horneamos historias/i)
    expect(screen.getByText(/Oficio sin apuros/i)).toBeInTheDocument()
    expect(screen.getByText(/Hospitalidad cercana/i)).toBeInTheDocument()
    expect(screen.getByText(/Comunidad y barrio/i)).toBeInTheDocument()
    expect(screen.getByText(/Creemos en sabores honestos/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Explorar vitrina/i }))
    expect(onNavigate).toHaveBeenCalledWith('catalogo')
  })
})
