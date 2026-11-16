import { useEffect, useState } from 'react'
import './App.css'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Header from './components/Header'
import { CartProvider } from './context/CartContext'
import { pages } from './data/pages'

import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Nosotros from './pages/Nosotros'
import Eventos from './pages/Eventos'
import Contacto from './pages/Contacto'
import Login from './pages/Login'
import Registro from './pages/Registro'

function AppContent() {
  const [page, setPage] = useState(() => window.location.hash.replace('#/', '') || 'inicio')
  const [quote, setQuote] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  function navigate(nextPage, quoteData = null) {
    const safePage =
  pages.includes(nextPage) ||
  nextPage === 'login' ||
  nextPage === 'registro'
    ? nextPage
    : 'inicio'

    if (safePage === 'contacto') {
      setQuote(quoteData)
    }

    window.history.pushState({}, '', `#/${safePage}`)
    setPage(safePage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleBack = () => setPage(window.location.hash.replace('#/', '') || 'inicio')
    window.addEventListener('popstate', handleBack)
    window.addEventListener('hashchange', handleBack)
    return () => {
      window.removeEventListener('popstate', handleBack)
      window.removeEventListener('hashchange', handleBack)
    }
  }, [])

  const content = {
    login: <Login />,
    registro: <Registro />,
    inicio: <Inicio onNavigate={navigate} />,
    catalogo: <Catalogo onOpenCart={() => setCartOpen(true)} />,
    nosotros: <Nosotros onNavigate={navigate} />,
    eventos: <Eventos onNavigate={navigate} />,
    contacto: <Contacto key={quote ? `${quote.offering}-${quote.guests}-${quote.service}` : 'default'} quote={quote} />,
  }[page] || <Inicio onNavigate={navigate} />

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} onOpenCart={() => setCartOpen(true)} />
      {content}
      <Footer onNavigate={navigate} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} onNavigate={navigate} />
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App