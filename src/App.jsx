import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { pages } from './data/pages'

import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Eventos from './pages/Eventos'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'

const STORAGE_KEY = 'aurum-cart'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [quote, setQuote] = useState(null)
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY)
      return storedCart ? JSON.parse(storedCart) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  function navigateTo(nextPage, quoteData = null) {
    const safePage = pages.includes(nextPage) ? nextPage : 'inicio'

    if (safePage === 'contacto') {
      setQuote(quoteData)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate(`/${safePage}`)
  }

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.name === product.name)

      if (existingItem) {
        return currentCart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(productName, nextQuantity) {
    setCart((currentCart) => {
      if (nextQuantity <= 0) {
        return currentCart.filter((item) => item.name !== productName)
      }

      return currentCart.map((item) =>
        item.name === productName ? { ...item, quantity: nextQuantity } : item
      )
    })
  }

  function removeFromCart(productName) {
    setCart((currentCart) => currentCart.filter((item) => item.name !== productName))
  }

  const currentPage = location.pathname.replace('/', '') || 'inicio'
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="app-shell">
      <Header page={currentPage} onNavigate={navigateTo} cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Inicio onNavigate={navigateTo} />} />
        <Route
          path="/catalogo"
          element={<Catalogo onAddToCart={addToCart} onNavigate={navigateTo} />}
        />
        <Route path="/eventos" element={<Eventos onNavigate={navigateTo} />} />
        <Route path="/contacto" element={<Contacto quote={quote} cart={cart} />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onNavigate={navigateTo}
            />
          }
        />
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App