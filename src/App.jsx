import { HashRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { pages } from './data/pages'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Nosotros from './pages/Nosotros'
import Eventos from './pages/Eventos'
import Contacto from './pages/Contacto'

const routeByPage = {
  inicio: '/',
  catalogo: '/catalogo',
  nosotros: '/nosotros',
  eventos: '/eventos',
  contacto: '/contacto',
}

function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cartOpen, setCartOpen] = useState(false)
  const [quote, setQuote] = useState(null)

  const currentPage = (() => {
    const match = Object.entries(routeByPage).find(([, path]) => path === location.pathname)
    return match ? match[0] : 'inicio'
  })()

  function handleNavigate(nextPage, quoteData = null) {
    const safePage = pages.includes(nextPage) ? nextPage : 'inicio'

    if (safePage === 'contacto') {
      setQuote(quoteData)
    } else {
      setQuote(null)
    }

    navigate(routeByPage[safePage])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const content = {
    inicio: <Inicio onNavigate={handleNavigate} />,
    catalogo: <Catalogo onOpenCart={() => setCartOpen(true)} />,
    nosotros: <Nosotros onNavigate={handleNavigate} />,
    eventos: <Eventos onNavigate={handleNavigate} />,
    contacto: <Contacto key={quote ? `${quote.offering}-${quote.guests}-${quote.service}` : 'default'} quote={quote} />,
  }[currentPage] || <Inicio onNavigate={handleNavigate} />

  return (
    <div className="app-shell">
      <Header page={currentPage} onNavigate={handleNavigate} onOpenCart={() => setCartOpen(true)} />
      {content}
      <Footer onNavigate={handleNavigate} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} onNavigate={handleNavigate} />
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/catalogo" element={<AppContent />} />
      <Route path="/nosotros" element={<AppContent />} />
      <Route path="/eventos" element={<AppContent />} />
      <Route path="/contacto" element={<AppContent />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  )
}

export default App