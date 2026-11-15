import nosotrosTallerImg from '../assets/images/nosotros_taller_equipo_1794714951519.jpg'
import nosotrosIngredientesImg from '../assets/images/nosotros_ingredientes_nobles_1794714951896.jpg'
import MediaImage from '../components/MediaImage'

const pillars = [
  {
    number: '01.',
    title: 'Oficio sin apuros',
    description:
      'Respetamos fermentaciones de 24 a 48 horas y cocciones lentas para que cada croissant, pan y bizcocho conserve su textura natural sin aditivos.',
  },
  {
    number: '02.',
    title: 'Hospitalidad cercana',
    description:
      'Más que despachar cajas, nos importa escucharte: te ayudamos a elegir sabores, porciones y detalles para que disfrutes tanto al encargar como al compartir.',
  },
  {
    number: '03.',
    title: 'Comunidad y barrio',
    description:
      'Trabajamos junto a productores locales de frutos rojos, huevos de campo y tostadores independientes de Santiago para dar vida a cada receta.',
  },
]

export default function Nosotros({ onNavigate }) {
  return (
    <main className="page">
      <section className="container home-hero-split nosotros-hero-split">
        <div className="hero-editorial">
          <p className="eyebrow">Acerca de nosotros · Taller Santiago</p>
          <h1>Horneamos historias para <em>compartir en tu mesa.</em></h1>
          <p className="hero-description">
            Aurum Bakery nació hace más de diez años como un pequeño mesón de barrio con una idea sencilla: unir la técnica clásica de la pastelería francesa y vienesa con la calidez de nuestra mesa chilena.
          </p>
          <div className="hero-actions">
            <button type="button" className="button button-primary" onClick={() => onNavigate('catalogo')}>
              Explorar vitrina <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="hero-link" onClick={() => onNavigate('contacto')}>
              Escríbenos o visítanos
            </button>
          </div>
        </div>

        <div className="hero-showcase">
          <MediaImage
            className="hero-slide active"
            src={nosotrosTallerImg}
            alt="Pasteleras de Aurum Bakery preparando tortas y bollería artesanal en el taller"
          />
        </div>
      </section>

      <section className="container nosotros-pillars-section" aria-label="Nuestra forma de trabajar">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Lo que nos mueve cada mañana</p>
            <h2>Calidez humana en <em>cada detalle</em></h2>
          </div>
          <p className="section-side-note">Del horno a tu mesa, siempre en lotes pequeños</p>
        </div>

        <div className="nosotros-pillars-grid">
          {pillars.map((item) => (
            <article className="nosotros-pillar-card" key={item.number}>
              <span className="nosotros-pillar-num">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container home-about-section nosotros-craft-split" aria-label="Ingredientes y oficio">
        <div className="home-about-copy">
          <p className="eyebrow">Ingredientes nobles</p>
          <h2>Creemos en sabores honestos <em>que reconfortan.</em></h2>
          <p className="home-about-lead">
            Elegimos mantequilla fresca, vainas enteras de vainilla de Madagascar, chocolate amargo al 70%, pistachos tostados y manjar cocido a fuego lento. Preferimos el dulzor equilibrado para que cada bocado invite a conversar sin prisa alrededor de una buena taza de café.
          </p>
          <ul className="about-highlights">
            <li>Sin premezclas ni conservantes artificiales</li>
            <li>Opciones pensadas para celebraciones familiares y corporativas</li>
            <li>Equipo atento en Providencia de lunes a sábado</li>
          </ul>
        </div>
        <div className="home-about-media">
          <MediaImage
            src={nosotrosIngredientesImg}
            alt="Ingredientes nobles de pastelería: vainilla en rama, chocolate 70%, pistachos, frambuesas y huevos de campo"
          />
        </div>
      </section>

      <section className="container home-cta">
        <div>
          <p className="eyebrow">Siempre bienvenido</p>
          <h2>¿Pasas por un café o armamos <em>tu próximo encargo?</em></h2>
        </div>
        <div className="home-cta-actions">
          <button type="button" className="button button-primary" onClick={() => onNavigate('contacto')}>
            Conversar con el taller
          </button>
          <button type="button" className="hero-link" onClick={() => onNavigate('eventos')}>
            Cotizar un evento
          </button>
        </div>
      </section>
    </main>
  )
}
