import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

describe('Componente Header', () => {
  it('muestra la marca, abre el menú y lo cierra al elegir Catálogo', () => {
    const onNavigate = vi.fn()
    render(<Header page="inicio" onNavigate={onNavigate} />)

    expect(screen.getByText(/Aurum Bakery/i)).toBeInTheDocument()

    const menuButton = screen.getByRole('button', {
      name: /Abrir menú/i,
    })

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(screen.getByRole('button', { name: /^Catalogo$/i }))

    expect(onNavigate).toHaveBeenCalledWith('catalogo')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})