import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { pages } from './data/pages'

import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Eventos from './pages/Eventos'
import Contacto from './pages/Contacto'

function App() {
  const [page, setPage] = useState(() => window.location.hash.replace('#/', '') || 'inicio')
  const [quote, setQuote] = useState(null)

  function navigate(nextPage, quoteData = null) {
  const safePage = pages.includes(nextPage) ? nextPage : 'inicio'

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
    inicio: <Inicio onNavigate={navigate} />,
    catalogo: <Catalogo />,
    eventos: <Eventos onNavigate={navigate} />,
    contacto: <Contacto quote={quote} />,
  }[page] || <Inicio onNavigate={navigate} />

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} />
      {content}
      <Footer />
    </div>
  )
}

export default App