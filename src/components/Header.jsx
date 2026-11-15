import { useState } from 'react'
import { pages } from '../data/pages'
import { useCart } from '../hooks/useCart'
import { BrandMark, CartIcon } from './BrandLogo'

function Header({ page, onNavigate, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()

  function navigate(nextPage) {
    onNavigate(nextPage)
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container header-content">
        <button className="brand" onClick={() => navigate('inicio')} aria-label="Ir al inicio">
          <BrandMark size={30} className="brand-mark" />
          <span>Aurum Bakery</span>
        </button>

        <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          {pages.map((item) => (
            <button
              key={item}
              className={page === item ? 'nav-link active' : 'nav-link'}
              onClick={() => navigate(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </nav>

        <div className="header-right">
          <button
            type="button"
            className="header-cart-btn"
            onClick={() => {
              setMenuOpen(false)
              if (onOpenCart) onOpenCart()
            }}
            aria-label={`Abrir carrito de compra, ${itemCount} artículos`}
          >
            <CartIcon size={20} />
            {itemCount > 0 && (
              <span className="cart-count-badge tabular-price" aria-hidden="true">
                {itemCount}
              </span>
            )}
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <span />
            <span />
            <span />
            <span className="sr-only">Abrir menú</span>
          </button>
        </div>
      </div>
    </header>
  )
}
export default Header