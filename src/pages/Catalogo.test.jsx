import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Catalogo from './Catalogo'

describe('Página de Catálogo', () => {
    it('muestra el catálogo y permite abrir y cerrar los detalles de Macarons', () => {
    render(<Catalogo />)

    expect(screen.getByText(/Descubre nuestras/i)).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    const detailButtons = screen.getAllByRole('button', {
      name: /Ver detalle/i,
    })
    fireEvent.click(detailButtons[0])

    expect(
      screen.getByRole('dialog', { name: /Macarons/i })
    ).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: /Cerrar detalles/i })
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('muestra mensaje de "sin resultados" al buscar algo que no existe', () => {
    render(<Catalogo />)
    const searchInput = screen.getByPlaceholderText(/Buscar una creación/i)
    fireEvent.change(searchInput, { target: { value: 'producto inexistente 123' } })
    expect(screen.getByText(/No encontramos esa creación/i)).toBeInTheDocument()
    expect(screen.queryAllByRole('article')).toHaveLength(0)

    fireEvent.click(
      screen.getByRole('button', { name: /Ver todo el catálogo/i })
    )

    expect(searchInput).toHaveValue('')
    expect(screen.getAllByRole('article')).toHaveLength(10)
    expect(
      screen.queryByText(/No encontramos esa creación/i)
    ).not.toBeInTheDocument()
      })
})