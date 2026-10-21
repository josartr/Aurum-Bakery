import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Componente Header', () => {
  it('muestra la marca, abre el menú y lo cierra al elegir Catálogo', () => {
    const onNavigate = vi.fn()
    render(
      <MemoryRouter>
        <Header page="inicio" onNavigate={onNavigate} />
      </MemoryRouter>
    )

    expect(screen.getByText(/Aurum Bakery/i)).toBeInTheDocument()

    const menuButton = screen.getByRole('button', {
      name: /Abrir menú/i,
    })

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(screen.getByRole('link', { name: /^Catalogo$/i }))

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})