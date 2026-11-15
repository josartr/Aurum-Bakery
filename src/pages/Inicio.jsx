import { useState, useEffect } from 'react'
import heroVitrinaImg from '../assets/images/hero_aurum_vitrina_1794711903992.jpg'
import heroPatisserieImg from '../assets/images/hero_aurum_patisserie_1794710283712.jpg'
import viennoiserieImg from '../assets/images/product_viennoiserie_1794710283251.jpg'
import tortaAurumImg from '../assets/images/product_torta_aurum_1794710285080.jpg'
import nosotrosTallerImg from '../assets/images/nosotros_taller_equipo_1794714951519.jpg'
import MediaImage from '../components/MediaImage'
import { products } from '../data/products'

const heroSlides = [
  {
    image: heroVitrinaImg,
    alt: 'Entremet de chocolate con hoja de oro, croissants y macarons de pistacho sobre travertino',
    caption: 'Colección diaria · Lotes pequeños',
  },
  {
    image: heroPatisserieImg,
    alt: 'Mesa de pastelería artesanal Aurum Bakery con croissants, torta y macarons',
    caption: 'Atelier de pastelería · Providencia',
  },
  {
    image: viennoiserieImg,
    alt: 'Croissants y pain au chocolat recién horneados',
    caption: 'Hojaldre de mantequilla fermentada',
  },
  {
    image: tortaAurumImg,
    alt: 'Torta de celebración con crema suiza y frutos del bosque',
    caption: 'Pastelería de autor para celebraciones',
  },
]

export default function Inicio({ onNavigate }) {
  const [slide, setSlide] = useState(0)
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3)

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 5500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="page">
      <section className="container home-hero-split">
        <div className="hero-editorial">
          <p className="eyebrow">Pastelería artesanal · Santiago</p>
          <h1>Pequeños momentos, <em>grandes sabores.</em></h1>
          <p className="hero-description">
            Creamos dulces memorables con ingredientes nobles, fermentación lenta y técnicas de autor para acompañar tus pausas y celebraciones.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => onNavigate('catalogo')}>
              Explorar creaciones <span aria-hidden="true">→</span>
            </button>
            <button className="hero-link" onClick={() => onNavigate('eventos')}>
              Planifica tu celebración
            </button>
          </div>
          <div className="hero-slide-controls">
            <div className="carousel-dots">
              {heroSlides.map((item, index) => (
                <button
                  key={item.alt}
                  className={index === slide ? 'carousel-dot active' : 'carousel-dot'}
                  onClick={() => setSlide(index)}
                  aria-label={`Mostrar imagen ${index + 1}`}
                />
              ))}
            </div>
            <span className="hero-caption">{heroSlides[slide].caption}</span>
          </div>
        </div>

        <div className="hero-showcase" aria-label="Galería de productos destacados">
          {heroSlides.map((item, index) => (
            <MediaImage
              key={item.alt}
              className={index === slide ? 'hero-slide active' : 'hero-slide'}
              src={item.image}
              alt={item.alt}
            />
          ))}
        </div>
      </section>

      <section className="container home-about-section" aria-label="Acerca de nosotros">
        <div className="home-about-media">
          <MediaImage
            src={nosotrosTallerImg}
            alt="Equipo de pasteleras de Aurum Bakery decorando una torta y pincelando croissants en el taller"
          />
        </div>
        <div className="home-about-copy">
          <p className="eyebrow">Acerca de nosotros</p>
          <h2>Un taller cálido donde horneamos <em>con cariño y calma.</em></h2>
          <p className="home-about-lead">
            En Aurum Bakery creemos que la pastelería se disfruta mejor cuando tiene historia y manos cercanas detrás. Cada madrugada encendemos los hornos en Providencia para recibirte con aromas a mantequilla tostada, café recién molido y recetas pensadas para acompañar tu mesa.
          </p>
          <ul className="about-highlights">
            <li>Recepción amable y asesoría cercana para cada encargo</li>
            <li>Ingredientes reales: vainilla en rama, cacao al 70% y fruta fresca</li>
            <li>Lotes pequeños horneados a diario desde las 06:00 de la mañana</li>
          </ul>
          <div className="home-about-actions">
            <button type="button" className="button button-primary" onClick={() => onNavigate('nosotros')}>
              Conoce nuestra historia <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="hero-link" onClick={() => onNavigate('contacto')}>
              Ven a saludarnos
            </button>
          </div>
        </div>
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
          {featuredProducts.map((product) => (
            <article
              className="featured-card"
              key={product.id || product.name}
            >
              <button
                type="button"
                className="featured-card-trigger"
                onClick={() => onNavigate('catalogo')}
                aria-label={`Ver ${product.name} en el catálogo`}
              >
                <div className="featured-card-media">
                  <MediaImage src={product.image} alt={product.name} />
                </div>
                <div className="featured-card-content">
                  <span>{product.category} · {product.unit}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="container home-cta">
        <div>
          <p className="eyebrow">Para tus días especiales</p>
          <h2>Tu celebración merece <em>algo extraordinario.</em></h2>
        </div>
        <div className="home-cta-actions">
          <button className="button button-primary" onClick={() => onNavigate('contacto')}>
            Conversemos
          </button>
          <button className="hero-link" onClick={() => onNavigate('eventos')}>
            Calcular presupuesto
          </button>
        </div>
      </section>
    </main>
  )
}