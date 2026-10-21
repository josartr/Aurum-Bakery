import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { pages } from '../data/pages'

function Header({ page, onNavigate, cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function navigate(nextPage) {
    onNavigate(nextPage)
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container header-content">
        <button className="brand" onClick={() => navigate('inicio')} aria-label="Ir al inicio">
          Aurum Bakery
        </button>

        <div className="header-actions">
          <NavLink className="cart-link" to="/carrito" onClick={() => setMenuOpen(false)}>
            Carrito
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>

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

        <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          {pages.map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              end={item === 'inicio'}
              className={({ isActive }) => (page === item || isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setMenuOpen(false)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
export default Header