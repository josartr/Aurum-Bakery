import { useEffect, useState } from 'react'
import './App.css'

const products = [
  {
    name: 'Macarons de autor',
    category: 'Dulces',
    description: 'Caja de macarons artesanales con una selección de sabores de temporada.',
    image:
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=85',
    details: 'Delicados macarons artesanales, elaborados con almendra molida y rellenos cremosos. La caja incluye una selección curada por nuestro equipo.',
    options: ['Vainilla Madagascar', 'Frambuesa', 'Pistacho', 'Chocolate y avellana', 'Maracuyá'],
    price: 18900,
    unit: 'Caja de 12 unidades',
    badge: 'Más vendido',
    featured: true,
  },
  {
    name: 'Entremet de chocolate',
    category: 'Tortas',
    description: 'Mousse de chocolate 64%, caramelo salado y crocante de avellana.',
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=85',
    details: 'Una composición de pastelería fina con mousse de chocolate, corazón de caramelo salado y base crocante de avellana.',
    options: ['Chocolate y caramelo', 'Frambuesa y pistacho', 'Maracuyá y coco', 'Café y avellana'],
    price: 32900,
    unit: '6 porciones',
    badge: 'Favorito',
    featured: true,
  },
  {
    name: 'Torta celebración',
    category: 'Tortas',
    description: 'Una torta elegante y versátil para celebrar tus momentos importantes.',
    image:
      'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=85',
    details: 'Diseños únicos hechos a medida, ideales para cumpleaños, matrimonios y celebraciones. Reserva con al menos 72 horas de anticipación.',
    options: ['Vainilla con frutos rojos', 'Chocolate con ganache', 'Red velvet', 'Diseño temático'],
    price: 45900,
    unit: 'Desde 10 porciones',
    badge: 'Personalizable',
  },
  {
    name: 'Viennoiserie del día',
    category: 'Panadería',
    description: 'Hojaldres de mantequilla horneados cada mañana para disfrutar sin prisa.',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85',
    details: 'Elaboraciones artesanales de hojaldre y masa fermentada, horneadas a diario para conservar toda su textura y aroma.',
    options: ['Croissant de mantequilla', 'Pain au chocolat', 'Croissant de almendra', 'Kouign-amann'],
    price: 4900,
    unit: 'Unidad',
    badge: 'Horneado hoy',
  },
  {
    name: 'Tarta de frutos rojos',
    category: 'Tortas',
    description: 'Crema de vainilla, frutos rojos frescos y masa sablée de mantequilla.',
    image:
      'https://images.unsplash.com/photo-1464305795204-6f5e7c7f1b8a?auto=format&fit=crop&w=800&q=85',
    details: 'Una tarta ligera y fresca con crema de vainilla, frutos rojos de estación y una masa sablée delicadamente crujiente.',
    options: ['Frutos rojos', 'Frutilla y albahaca', 'Mango y maracuyá'],
    price: 28900,
    unit: '6 porciones',
    badge: 'De temporada',
  },
  {
    name: 'Cinnamon roll',
    category: 'Panadería',
    description: 'Masa brioche, canela de Ceylán y glaseado suave de queso crema.',
    image:
      'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=85',
    details: 'Masa brioche fermentada lentamente, rellena con canela de Ceylán y terminada con un glaseado suave de queso crema.',
    options: ['Clásico', 'Nueces tostadas', 'Manzana especiada'],
    price: 4500,
    unit: 'Unidad',
    badge: 'Horneado hoy',
  },
  {
    name: 'Cookies de chocolate',
    category: 'Dulces',
    description: 'Cookies grandes, centro suave, chocolate 55% y sal de mar.',
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=85',
    details: 'Cookies de gran formato con bordes dorados, centro suave, chocolate 55% y un toque final de sal de mar.',
    options: ['Chocolate 55%', 'Chocolate blanco y macadamia', 'Doble chocolate'],
    price: 3900,
    unit: 'Unidad',
    badge: 'Más vendido',
  },
  {
    name: 'Pan de masa madre',
    category: 'Panadería',
    description: 'Hogaza de fermentación natural, corteza crujiente y miga aireada.',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85',
    details: 'Hogaza de fermentación natural, elaborada con harinas seleccionadas y reposo prolongado para desarrollar sabor y textura.',
    options: ['Clásico', 'Semillas', 'Aceituna y romero'],
    price: 6900,
    unit: 'Hogaza de 650 g',
    badge: 'Horneado hoy',
  },
  {
    name: 'Mini éclairs',
    category: 'Dulces',
    description: 'Bocados de pâte à choux rellenos de crema y glaseados brillantes.',
    image:
      'https://images.unsplash.com/photo-1614707267537-2b7b3e6e2f6b?auto=format&fit=crop&w=800&q=85',
    details: 'Bocados delicados de pâte à choux, rellenos de crema pastelera y terminados con glaseados brillantes.',
    options: ['Vainilla', 'Café', 'Chocolate', 'Frambuesa'],
    price: 16900,
    unit: 'Caja de 6 unidades',
    badge: 'Para compartir',
  },
  {
    name: 'Brunch Aurum',
    category: 'Regalos',
    description: 'Una selección especial de panadería y dulces para regalar o disfrutar.',
    image:
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=85',
    details: 'La selección ideal para una mañana especial: incluye viennoiserie, pan de masa madre, mermelada artesanal y dulces del día.',
    options: ['Clásico', 'Sin frutos secos', 'Edición corporativa'],
    price: 39900,
    unit: 'Selección para 2 personas',
    badge: 'Regalo ideal',
    featured: true,
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
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const categories = ['Todos', ...new Set(products.map((product) => product.category))]
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory
    const searchTerm = search.trim().toLowerCase()
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)

    return matchesCategory && matchesSearch
  })

  return (
    <main className="page">
      <section className="container page-heading">
        <p className="eyebrow">Colección 2026</p>
        <h1>Descubre nuestras <em>creaciones</em></h1>
        <p className="lead">Una selección de piezas artesanales para tus días especiales, tus regalos y tus celebraciones.</p>
      </section>
      <section className="container catalog-toolbar" aria-label="Filtros del catálogo">
        <div className="category-filters" role="group" aria-label="Filtrar por categoría">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'filter-button active' : 'filter-button'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="sr-only">Buscar en el catálogo</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Buscar una creación"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </section>
      <section className="container catalog-summary" aria-live="polite">
        <p><strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'creación disponible' : 'creaciones disponibles'}</p>
        <p>Producción artesanal en lotes pequeños</p>
      </section>
      <section className="container product-grid" aria-label="Productos del catálogo">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.name}>
            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} />
              {product.badge && <span className="product-badge">{product.badge}</span>}
            </div>
            <div className="product-card-body">
              <div className="product-card-meta">
                <span>{product.category}</span>
                <span>{product.unit}</span>
              </div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-card-footer">
                <strong>{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(product.price)}</strong>
                <button className="text-button" onClick={() => setSelectedProduct(product)}>
                  Ver detalle <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
      {filteredProducts.length === 0 && (
        <div className="container empty-catalog">
          <p className="eyebrow">Sin resultados</p>
          <h2>No encontramos esa creación</h2>
          <p>Prueba con otro término o revisa todas nuestras categorías.</p>
          <button className="button button-secondary" onClick={() => { setSearch(''); setActiveCategory('Todos') }}>
            Ver todo el catálogo
          </button>
        </div>
      )}
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
            <p className="modal-price">{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(selectedProduct.price)} <span>{selectedProduct.unit}</span></p>
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

const eventOfferings = [
  { id: 'mesa-dulce', name: 'Mesa dulce', detail: 'Selección de mini postres y montaje', pricePerGuest: 8500 },
  { id: 'torta', name: 'Torta de celebración', detail: 'Torta personalizada y decoración', pricePerGuest: 5500 },
  { id: 'brunch', name: 'Brunch corporativo', detail: 'Panadería, dulces y bebidas', pricePerGuest: 12500 },
  { id: 'corporativo', name: 'Regalos corporativos', detail: 'Cajas personalizadas para invitados', pricePerGuest: 10500 },
]

const eventServices = [
  { id: 'retiro', name: 'Retiro en tienda', price: 0 },
  { id: 'despacho', name: 'Despacho programado', price: 15000 },
  { id: 'montaje', name: 'Despacho y montaje', price: 45000 },
]

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value)

function EventsPage({ onNavigate }) {
  const [guests, setGuests] = useState(30)
  const [offeringId, setOfferingId] = useState(eventOfferings[0].id)
  const [serviceId, setServiceId] = useState(eventServices[1].id)
  const [submitted, setSubmitted] = useState(false)
  const offering = eventOfferings.find((item) => item.id === offeringId)
  const service = eventServices.find((item) => item.id === serviceId)
  const estimate = (Number(guests) || 0) * offering.pricePerGuest + service.price

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="page">
      <section className="container page-heading">
        <p className="eyebrow">Celebraciones</p>
        <h1>Haz de tu evento algo <em>memorable</em></h1>
        <p className="lead">Diseñamos experiencias dulces para matrimonios, celebraciones, empresas y eventos especiales.</p>
      </section>
      <section className="container event-planner">
        <div className="event-planner-copy">
          <p className="eyebrow">Planifica tu experiencia</p>
          <h2>Calcula un presupuesto <em>aproximado</em></h2>
          <p>Selecciona el formato que necesitas, cuéntanos cuántos invitados tendrás y ajusta el servicio. El valor final se confirma según diseño, sabores y logística.</p>
          <div className="event-benefits">
            <span>✓ Ingredientes seleccionados</span>
            <span>✓ Propuesta personalizada</span>
            <span>✓ Atención de principio a fin</span>
          </div>
        </div>
        <form className="estimate-card" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="event-offering">Producto o servicio</label>
            <select id="event-offering" value={offeringId} onChange={(event) => setOfferingId(event.target.value)}>
              {eventOfferings.map((item) => <option key={item.id} value={item.id}>{item.name} - {item.detail}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="event-guests">Número de invitados</label>
            <input id="event-guests" type="number" min="1" max="1000" value={guests} onChange={(event) => setGuests(event.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="event-service">Logística</label>
            <select id="event-service" value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
              {eventServices.map((item) => <option key={item.id} value={item.id}>{item.name}{item.price ? ` (+${formatCurrency(item.price)})` : ''}</option>)}
            </select>
          </div>
          <div className="estimate-result" aria-live="polite">
            <span>Presupuesto estimado</span>
            <strong>{formatCurrency(estimate)}</strong>
            <small>{formatCurrency(offering.pricePerGuest)} por invitado + {formatCurrency(service.price)} de logística</small>
          </div>
          <button className="button button-primary" type="submit">Solicitar cotización formal</button>
          {submitted && <p className="form-success" role="status">Perfecto. Escríbenos en Contacto con estos datos y prepararemos una propuesta a tu medida.</p>}
        </form>
      </section>
      <section className="container event-process">
        <div><span>01</span><h3>Conversamos</h3><p>Entendemos tu fecha, estilo y número de invitados.</p></div>
        <div><span>02</span><h3>Diseñamos</h3><p>Preparamos una propuesta con sabores, cantidades y montaje.</p></div>
        <div><span>03</span><h3>Celebramos</h3><p>Coordinamos cada detalle para que solo te preocupes de disfrutar.</p></div>
      </section>
      <section className="container event-cta">
        <p>¿Ya tienes una idea en mente?</p>
        <button className="button button-secondary" onClick={() => onNavigate('contacto')}>Hablar con un especialista</button>
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
      <section className="container page-heading">
        <p className="eyebrow">Atención personalizada</p>
        <h1>Hablemos de tu próxima <em>celebración</em></h1>
        <p className="lead">Estamos aquí para ayudarte a elegir, personalizar y coordinar cada detalle. Respondemos en menos de 24 horas hábiles.</p>
      </section>
      <section className="container contact-layout">
        <aside className="contact-aside">
          <div className="contact-intro">
            <p className="eyebrow">Estamos para ayudarte</p>
            <h2>Un buen día comienza con una buena conversación.</h2>
            <p>Cuéntanos qué tienes en mente y nuestro equipo te orientará con opciones, disponibilidad y próximos pasos.</p>
          </div>
          <div className="contact-details">
            <a href="https://wa.me/56912345678" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>+56 9 1234 5678</strong></a>
            <a href="mailto:hola@aurumbakery.cl"><span>Correo electrónico</span><strong>hola@aurumbakery.cl</strong></a>
            <div><span>Horario de atención</span><strong>Lun - Sáb · 09:00 a 19:00</strong></div>
            <div><span>Visítanos</span><strong>Av. Providencia 1234, Santiago</strong></div>
          </div>
        </aside>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Nombre completo</label>
            <input id="name" name="name" type="text" placeholder="Tu nombre" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" name="email" type="email" placeholder="tucorreo@ejemplo.com" required />
          </div>
          <div className="form-field">
            <label htmlFor="reason">¿En qué podemos ayudarte?</label>
            <select id="reason" name="reason" defaultValue="evento">
              <option value="evento">Cotizar un evento</option>
              <option value="pedido">Hacer un pedido</option>
              <option value="personalizada">Torta personalizada</option>
              <option value="corporativo">Regalos corporativos</option>
              <option value="otro">Otra consulta</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="message">Cuéntanos más</label>
            <textarea id="message" name="message" rows="5" placeholder="Fecha, cantidad de personas, sabores o cualquier detalle importante" required />
          </div>
          <button className="button button-primary" type="submit">Enviar consulta</button>
          {submitted && <p className="form-success" role="status">Gracias por escribirnos. Recibimos tu consulta y te responderemos dentro de 24 horas hábiles.</p>}
        </form>
      </section>
      <section className="container contact-faq">
        <p className="eyebrow">Preguntas frecuentes</p>
        <div className="faq-grid">
          <div><h3>¿Con cuánta anticipación debo reservar?</h3><p>Recomendamos 72 horas para pedidos simples y 7 a 10 días para eventos o tortas personalizadas.</p></div>
          <div><h3>¿Realizan despacho?</h3><p>Sí, coordinamos despachos programados y servicio de montaje según comuna y disponibilidad.</p></div>
          <div><h3>¿Puedo solicitar una degustación?</h3><p>Para eventos sobre 40 invitados podemos coordinar una degustación previa con nuestro equipo.</p></div>
        </div>
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
