import { useEffect, useState } from 'react'
import './App.css'

const products = [
  {
    name: 'Macarons',
    description: 'Delicados macarons artesanales en diferentes sabores.',
    image:
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85',
    details:
      'Delicados macarons artesanales, elaborados con almendra molida y rellenos cremosos.',
    options: ['Vainilla Madagascar', 'Frambuesa', 'Pistacho', 'Chocolate y avellana', 'Maracuyá'],
  },
  {
    name: 'Entremets',
    description: 'Creaciones sofisticadas para ocasiones especiales.',
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=85',
    details: 'Creaciones de pastelería fina, compuestas por capas de bizcocho, mousse y crocante.',
    options: ['Chocolate y caramelo', 'Frambuesa y pistacho', 'Maracuyá y coco', 'Café y avellana'],
  },
  {
    name: 'Tortas personalizadas',
    description: 'Diseños únicos para celebrar tus momentos importantes.',
    image:
      'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=85',
    details: 'Diseños únicos hechos a medida, ideales para cumpleaños, matrimonios y celebraciones.',
    options: ['Vainilla con frutos rojos', 'Chocolate con ganache', 'Red velvet', 'Diseño temático'],
  },
  {
    name: 'Viennoiserie',
    description: 'Elaboraciones artesanales para disfrutar cada día.',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85',
    details: 'Elaboraciones artesanales de hojaldre y masa fermentada, horneadas a diario.',
    options: ['Croissant de mantequilla', 'Pain au chocolat', 'Croissant de almendra', 'Kouign-amann'],
  },
]

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=1400&q=85',
    alt: 'Pastelería artesanal recién horneada',
  },
  {
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85',
    alt: 'Hogazas de pan recién horneadas',
  },
  {
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1400&q=85',
    alt: 'Cupcakes de colores pastel',
  },
]

const pages = ['inicio', 'catalogo', 'eventos', 'contacto']

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

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <h2>Aurum Bakery</h2>
        <p>Pastelería artesanal de alto nivel</p>
        <small>© 2026 Aurum Bakery. Todos los derechos reservados.</small>
      </div>
    </footer>
  )
}

function HomePage({ onNavigate }) {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="page">
      <section className="container hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Pastelería artesanal</p>
          <h1>Descubre <em>el sabor del oro</em> en cada bocado.</h1>
          <p className="lead">Donde la pastelería se convierte en arte.</p>
        </div>
        <div className="hero-carousel" aria-label="Galería de productos destacados">
          {heroSlides.map((item, index) => (
            <img
              key={item.image}
              className={index === slide ? 'hero-slide active' : 'hero-slide'}
              src={item.image}
              alt={item.alt}
            />
          ))}
          <div className="carousel-dots">
            {heroSlides.map((item, index) => (
              <button
                key={item.image}
                className={index === slide ? 'carousel-dot active' : 'carousel-dot'}
                onClick={() => setSlide(index)}
                aria-label={`Mostrar imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <button className="button button-primary hero-button" onClick={() => onNavigate('catalogo')}>
          Ver nuestro catálogo
        </button>
      </section>
    </main>
  )
}

function CatalogPage() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <main className="page">
      <section className="container page-heading">
        <p className="eyebrow">Nuestro catálogo</p>
        <h1>Descubre todas nuestras <em>creaciones</em></h1>
        <p className="lead">Cada pieza está elaborada con ingredientes seleccionados y dedicación artesanal.</p>
      </section>
      <section className="container product-grid" aria-label="Productos del catálogo">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <img src={product.image} alt={product.name} />
            <div className="product-card-body">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <button className="text-button" onClick={() => setSelectedProduct(product)}>
                Ver detalles <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        ))}
      </section>
      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}>
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Cerrar detalles">
              ×
            </button>
            <p className="eyebrow">Creación artesanal</p>
            <h2 id="product-modal-title">{selectedProduct.name}</h2>
            <p>{selectedProduct.details}</p>
            <h3>Variedades disponibles</h3>
            <ul>
              {selectedProduct.options.map((option) => <li key={option}>{option}</li>)}
            </ul>
          </section>
        </div>
      )}
    </main>
  )
}

function EventsPage({ onNavigate }) {
  return (
    <main className="page">
      <section className="container centered-page">
        <p className="eyebrow">Celebraciones</p>
        <h1>Haz de tu evento algo <em>memorable</em></h1>
        <p className="lead">Diseñamos experiencias dulces para matrimonios, celebraciones, empresas y eventos especiales.</p>
        <button className="button button-primary" onClick={() => onNavigate('contacto')}>
          Solicitar una cotización
        </button>
      </section>
    </main>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="page">
      <section className="container centered-page">
        <p className="eyebrow">Hablemos</p>
        <h1>Ponte en <em>contacto</em> con nosotros</h1>
        <p className="lead">¿Tienes dudas, pedidos especiales o quieres cotizar un evento? Escríbenos y te responderemos a la brevedad.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input id="name" name="name" type="text" placeholder="Tu nombre" required />
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" name="email" type="email" placeholder="tucorreo@ejemplo.com" required />
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" rows="5" placeholder="Cuéntanos qué necesitas" required />
          <button className="button button-primary" type="submit">Enviar mensaje</button>
          {submitted && <p className="form-success" role="status">Gracias por escribirnos. Te contactaremos pronto.</p>}
        </form>
      </section>
    </main>
  )
}

function App() {
  const [page, setPage] = useState(() => window.location.hash.replace('#/', '') || 'inicio')

  function navigate(nextPage) {
    const safePage = pages.includes(nextPage) ? nextPage : 'inicio'
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
    inicio: <HomePage onNavigate={navigate} />,
    catalogo: <CatalogPage />,
    eventos: <EventsPage onNavigate={navigate} />,
    contacto: <ContactPage />,
  }[page] || <HomePage onNavigate={navigate} />

  return (
    <div className="app-shell">
      <Header page={page} onNavigate={navigate} />
      {content}
      <Footer />
    </div>
  )
}

export default App
