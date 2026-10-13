import { useState } from 'react'
import { pages } from '../data/pages'

function Header({ page, onNavigate }) {
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
      </div>
    </header>
  )
}
export default Header