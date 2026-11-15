import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Catalogo from './Catalogo'
import { products } from '../data/products'

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

  it('muestra mensaje de "sin resultados" al buscar algo que no existe y restaura todos los productos', () => {
    render(<Catalogo />)
    const searchInput = screen.getByPlaceholderText(/Buscar creación o relleno/i)
    fireEvent.change(searchInput, { target: { value: 'producto inexistente 123' } })
    expect(screen.getByText(/No encontramos esa creación/i)).toBeInTheDocument()
    expect(screen.queryAllByRole('article')).toHaveLength(0)

    fireEvent.click(
      screen.getByRole('button', { name: /Ver todo el catálogo/i })
    )

    expect(searchInput).toHaveValue('')
    expect(screen.getAllByRole('article')).toHaveLength(products.length)
    expect(
      screen.queryByText(/No encontramos esa creación/i)
    ).not.toBeInTheDocument()
  })

  it('clasifica productos en Tortas, Bollería, Pasteles, Galletas y Brunch con imágenes únicas', () => {
    render(<Catalogo />)

    expect(screen.getByRole('button', { name: 'Tortas' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Bollería' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pasteles' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Galletas' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Brunch' })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /Croissant relleno artesanal/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Medialunas artesanales/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Torta de Hojarasca/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Torta Tres Leches/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Torta Pompadour/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Torta Sacher/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Torta Ópera/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Torta Tiramisú/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Pavlova de estación/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Brunch Aurum/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Brunch Americano/i })).toBeInTheDocument()

    expect(screen.getByText(/crema de plátano natural y manjar artesanal/i)).toBeInTheDocument()
    expect(screen.getByText(/Croissant relleno a elección, café de grano a elección, jugo de naranja y sándwich jamón\/queso/i)).toBeInTheDocument()
    expect(new Set(products.map((p) => p.image)).size).toBe(products.length)
  })

  it('muestra marcadores de posición minimalistas (skeleton screens) mientras carga o cambia de categoría', () => {
    vi.useFakeTimers()
    try {
      const { rerender } = render(<Catalogo loading />)

      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
      expect(screen.queryAllByRole('article')).toHaveLength(0)

      rerender(<Catalogo loading={false} />)
      expect(screen.getAllByRole('article')).toHaveLength(products.length)

      fireEvent.click(screen.getByRole('button', { name: 'Bollería' }))
      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')

      act(() => {
        vi.advanceTimersByTime(250)
      })

      expect(screen.queryByRole('status')).not.toBeInTheDocument()
      expect(screen.getAllByRole('article')).toHaveLength(5)
    } finally {
      vi.useRealTimers()
    }
  })

  it('ofrece exactamente 3 tamaños adaptados a cada tipo de torta y actualiza el precio al elegir tamaño', () => {
    const tortas = products.filter((p) => p.category === 'Tortas')
    expect(tortas.length).toBeGreaterThan(0)
    for (const torta of tortas) {
      expect(torta.sizes).toHaveLength(3)
    }

    render(<Catalogo />)
    const sacherTitle = screen.getByRole('heading', { name: /Torta Sacher/i })
    const sacherCard = sacherTitle.closest('article')
    fireEvent.click(sacherCard.querySelector('.text-button'))

    const dialog = screen.getByRole('dialog', { name: /Torta Sacher/i })
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText(/Tamaño disponible/i)).toBeInTheDocument()

    const size16Btn = screen.getByRole('button', { name: '16 porciones' })
    fireEvent.click(size16Btn)
    expect(dialog).toHaveTextContent(/\$\s*61\.900/)
    expect(screen.getAllByRole('button', { name: 'Añadir al carrito' }).length).toBeGreaterThan(0)
    expect(screen.queryByRole('button', { name: /\+ Bolsa/i })).not.toBeInTheDocument()
  })

  it('despliega el popup al pulsar Añadir al carrito en productos con distintos sabores o tamaños y exige elegir antes de agregar', () => {
    const onOpenCart = vi.fn()
    render(<Catalogo onOpenCart={onOpenCart} />)

    const croissantTitle = screen.getByRole('heading', { name: /Croissant relleno artesanal/i })
    const croissantCard = croissantTitle.closest('article')
    fireEvent.click(croissantCard.querySelector('.add-link-btn'))

    const dialog = screen.getByRole('dialog', { name: /Croissant relleno artesanal/i })
    expect(dialog).toBeInTheDocument()

    const modalAddBtn = dialog.querySelector('.modal-buy-row button')
    fireEvent.click(modalAddBtn)
    expect(screen.getByRole('alert')).toHaveTextContent(/Selecciona una variedad o sabor/i)
    expect(onOpenCart).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Crema de pistachos' }))
    fireEvent.click(modalAddBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onOpenCart).toHaveBeenCalledTimes(1)
  })
})