import { useState, useEffect } from 'react'
import { products } from '../data/products'

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=1400&q=85',
    alt: 'Pastelería artesanal recién horneada',
  },
  {
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85',
    alt: 'Hogazas de pan recién horneadas',
  },
  {
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1400&q=85',
    alt: 'Cupcakes de colores pastel',
  },
]

export default function Inicio({ onNavigate }) {
  const [slide, setSlide] = useState(0)
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3)

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="page">
      <section className="container home-hero">
        <div className="hero-carousel" aria-label="Galería de productos destacados">
          {heroSlides.map((item, index) => (
            <img
              key={item.image}
              className={index === slide ? 'hero-slide active' : 'hero-slide'}
              src={item.image}
              alt={item.alt}
            />
          ))}
          <div className="hero-image-overlay" />
          <div className="hero-carousel-content">
            <p className="eyebrow">Pastelería artesanal · Santiago</p>
            <h1>Pequeños momentos, <em>grandes sabores.</em></h1>
            <p className="hero-description">Creamos dulces memorables con ingredientes nobles, técnicas de autor y mucho cariño.</p>
            <div className="hero-actions">
              <button className="button button-secondary" onClick={() => onNavigate('catalogo')}>
                Explorar creaciones <span aria-hidden="true">→</span>
              </button>
              <button className="hero-link" onClick={() => onNavigate('eventos')}>
                Planifica tu celebración
              </button>
            </div>
          </div>
          <div className="hero-note">
            <span className="hero-note-icon" aria-hidden="true">✦</span>
            <span><strong>Hecho a mano</strong><small>en lotes pequeños</small></span>
          </div>
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
      </section>
      <section className="container home-intro">
        <div>
          <p className="eyebrow">La esencia de Aurum</p>
          <h2>Elaboramos con tiempo, <em>servimos con orgullo.</em></h2>
        </div>
        <p className="home-intro-copy">Desde el primer amasado hasta el último detalle, cada creación nace para transformar una pausa cotidiana en un recuerdo especial.</p>
      </section>
      <section className="container trust-strip" aria-label="Razones para elegir Aurum Bakery">
        <div><strong>100%</strong><span>Artesanal</span></div>
        <div><strong>24h</strong><span>Horneado fresco</span></div>
        <div><strong>4.9/5</strong><span>Clientes felices</span></div>
        <div><strong>+10</strong><span>Años creando</span></div>
      </section>
      <section className="container featured-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Favoritos de la casa</p>
            <h2>Creaciones que <em>enamoran</em></h2>
          </div>
          <button className="text-button" onClick={() => onNavigate('catalogo')}>
            Ver catálogo completo <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="featured-grid">
          {featuredProducts.map((product, index) => (
            <article className={`featured-card featured-card-${index + 1}`} key={product.name}>
              <img src={product.image} alt={product.name} />
              <div className="featured-card-content">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="container home-cta">
        <div>
          <p className="eyebrow">Para tus días especiales</p>
          <h2>Tu celebración merece <em>algo extraordinario.</em></h2>
        </div>
        <button className="button button-secondary" onClick={() => onNavigate('contacto')}>
          Conversemos
        </button>
      </section>
    </main>
  )
}