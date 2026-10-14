import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Catalogo from './Catalogo'

describe('Página de Catálogo', () => {
  it('renderiza el título principal de la vista', () => {
    render(<Catalogo />)
    expect(screen.getByText(/Descubre nuestras/i)).toBeInTheDocument()
  })

  it('muestra mensaje de "sin resultados" al buscar algo que no existe', () => {
    render(<Catalogo />)
    const searchInput = screen.getByPlaceholderText(/Buscar una creación/i)
    fireEvent.change(searchInput, { target: { value: 'producto inexistente 123' } })
    expect(screen.getByText(/No encontramos esa creación/i)).toBeInTheDocument()
  })
})