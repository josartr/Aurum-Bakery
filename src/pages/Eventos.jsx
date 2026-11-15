import { useState } from 'react'
import heroEventosImg from '../assets/images/hero_eventos_mesa_dulce_1794711904418.jpg'
import MediaImage from '../components/MediaImage'
import { formatCurrency } from '../utils/formatters'

const eventCategories = [
  {
    id: 'bodas',
    title: 'Matrimonios & Bodas',
    subtitle: 'Alta pastelería romántica y atemporal',
    description:
      'Tortas nupciales de pisos en buttercream suizo o ganache, acompañadas de mesas dulces con estética limpia, flores frescas de estación y montaje integral en Santiago.',
  },
  {
    id: 'cumpleanos',
    title: 'Cumpleaños & Aniversarios',
    subtitle: 'Celebraciones íntimas o grandes encuentros',
    description:
      'Piezas de autor personalizadas en paleta, altura y sabores para celebrar momentos únicos en casa o salón, con acabados minimalistas y detalle en hoja de oro.',
  },
  {
    id: 'baby-shower',
    title: 'Baby Showers & Bautizos',
    subtitle: 'Dulzura delicada en tonos suaves',
    description:
      'Colecciones de mini tartaletas, macarons, financiers y tortas centrales diseñadas en tonos neutros y pastel para recibir a los más pequeños con calidez.',
  },
  {
    id: 'corporativo',
    title: 'Eventos Corporativos',
    subtitle: 'Lanzamientos, directorios y regalos de marca',
    description:
      'Coffee breaks artesanales, brunchs ejecutivos y cajas corporativas personalizadas con despacho puntual y presentación impecable para equipos e invitados.',
  },
]

const sweetTablePackages = [
  {
    id: 'intimo',
    name: 'Mesa Esencial',
    guests: 20,
    offeringId: 'mesa-dulce',
    badge: 'Ideal para reuniones íntimas',
    priceEstimate: 185000,
    summary: '45 piezas artesanales surtidas (2 a 3 bocados por persona)',
    includes: [
      '18 macarons franceses en 3 sabores de estación',
      '12 mini tartaletas de frutos rojos y limón merengado',
      '15 choux craquelin rellenos de vainilla Madagascar y chocolate 64%',
      'Presentación en cajas térmicas listas para servir o retiro en Providencia',
    ],
  },
  {
    id: 'celebracion',
    name: 'Mesa Celebración',
    guests: 50,
    offeringId: 'mesa-dulce',
    badge: 'Más solicitado',
    priceEstimate: 455000,
    summary: '125 piezas surtidas + Torta protagonista de 25 porciones',
    includes: [
      '1 torta artesanal Aurum de dos pisos personalizada en sabor y estética',
      '35 macarons surtidos y 30 mini entremets de chocolate y avellana',
      '30 mini tartaletas de estación y 30 financiers de pistacho o frambuesa',
      'Alquiler de bases en cerámica y travertino + despacho programado en Santiago',
    ],
  },
  {
    id: 'gala',
    name: 'Mesa Gala Atelier',
    guests: 100,
    offeringId: 'mesa-dulce',
    badge: 'Experiencia integral',
    priceEstimate: 895000,
    summary: '260 piezas de autor + Torta nupcial de 50 porciones + Montaje completo',
    includes: [
      '1 torta principal de 3 niveles con terminación en buttercream suizo o ganache',
      '80 macarons, 60 mini tartaletas, 60 éclairs artesanales y 60 trufas de cacao',
      'Opciones sin gluten y alternativas veganas rotuladas con elegancia',
      'Despacho refrigerado, alquiler completo de alzadores y montaje in situ por nuestro equipo',
    ],
  },
]

const flavorMenu = {
  bizcochos: [
    { name: 'Vainilla de Madagascar', note: 'Miga esponjosa aromatizada con vaina natural' },
    { name: 'Cacao Belga 70%', note: 'Bizcocho húmedo e intenso de chocolate oscuro' },
    { name: 'Red Velvet Clásico', note: 'Cacao suave con toque de buttermilk artesanal' },
    { name: 'Limón & Amapola', note: 'Fresco, cítrico y aromático con ralladura natural' },
    { name: 'Almendra & Pistacho (Sin gluten)', note: 'Elaborado con harina 100% de almendra tostada' },
  ],
  rellenos: [
    { name: 'Compota de Frutos Rojos', note: 'Frambuesas, moras y arándanos cocidos lentamente' },
    { name: 'Ganache de Chocolate & Caramelo Salado', note: 'Cremoso 64% con flor de sal de Cáhuil' },
    { name: 'Crema de Pistacho & Frambuesa', note: 'Pasta artesanal de pistacho tostado y centro ácido' },
    { name: 'Maracuyá & Chocolate Blanco', note: 'Equilibrio tropical y aterciopelado' },
    { name: 'Praliné de Avellana Europea', note: 'Cremoso con base crocante de feuilletine' },
  ],
  coberturas: [
    { name: 'Buttercream Suizo de Vainilla', note: 'Acabado liso, sedoso y bajo en dulzor' },
    { name: 'Ganache Montado de Chocolate Semi-amargo', note: 'Textura firme, elegante y profunda' },
    { name: 'Frosting de Queso Crema & Vainilla', note: 'Suave y equilibrado, ideal para Red Velvet' },
    { name: 'Merengue Suizo Tostado', note: 'Ligero, aireado y sutilmente caramelizado' },
  ],
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

const eventFaqs = [
  {
    q: '¿Con cuánta anticipación debo reservar mi evento?',
    a: 'Para tortas personalizadas y mesas dulces de hasta 30 personas recomendamos reservar con al menos 10 días de anticipación. Para matrimonios o eventos sobre 60 invitados sugerimos 3 a 4 semanas para asegurar disponibilidad de fecha y soportes.',
  },
  {
    q: '¿Cómo se confirma la reserva y cuál es la seña o abono?',
    a: 'Una vez aprobada tu propuesta, la fecha se bloquea con un abono del 50% del total presupuestado. El 50% restante se cancela hasta 72 horas antes de la entrega o montaje.',
  },
  {
    q: '¿Realizan despacho y montaje en toda la ciudad?',
    a: 'Sí. Cubrimos Santiago y alrededores con transporte refrigerado programado. Si eliges el servicio de montaje, nuestro equipo instala la mesa dulce completa con bases de cerámica y travertino entre 60 y 90 minutos antes del inicio.',
  },
  {
    q: '¿Puedo solicitar una degustación previa para mi matrimonio o evento?',
    a: 'Sí, para eventos de más de 40 invitados ofrecemos una caja degustación con 6 combinaciones de bizcochos y rellenos. Si confirmas tu evento con nosotros, el valor de la degustación se abona al total final.',
  },
  {
    q: '¿Cuentan con opciones sin gluten o para invitados con restricciones alimentarias?',
    a: 'Elaboramos mini postres y tortas con harinas de almendra y opciones sin azúcar añadida. Aunque trabajamos con protocolos cuidadosos de separación, nuestro taller no es libre de trazas ambientales.',
  },
]

export default function Eventos({ onNavigate }) {
  const [guests, setGuests] = useState(30)
  const [offeringId, setOfferingId] = useState(eventOfferings[0].id)
  const [serviceId, setServiceId] = useState(eventServices[1].id)
  const [eventDate, setEventDate] = useState('')
  const [eventType, setEventType] = useState('Matrimonio / Boda')
  const [commune, setCommune] = useState('')
  const [flavorChoice, setFlavorChoice] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const offering = eventOfferings.find((item) => item.id === offeringId)
  const service = eventServices.find((item) => item.id === serviceId)
  const estimate = (Number(guests) || 0) * offering.pricePerGuest + service.price

  function selectPackage(pkg) {
    setOfferingId(pkg.offeringId)
    setGuests(pkg.guests)
    setServiceId(pkg.guests >= 50 ? 'montaje' : 'despacho')
    const el = document.getElementById('cotizador-eventos')
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const payload = {
      offering: offering.name,
      guests: Number(guests),
      service: service.name,
      estimate,
    }

    if (eventDate || commune || flavorChoice) {
      payload.extraNotes = [
        eventType ? `Tipo de evento: ${eventType}` : '',
        eventDate ? `Fecha tentativa: ${eventDate}` : '',
        commune ? `Comuna / Lugar: ${commune}` : '',
        flavorChoice ? `Preferencia de sabores: ${flavorChoice}` : '',
      ]
        .filter(Boolean)
        .join(' · ')
    }

    onNavigate('contacto', payload)
    setSubmitted(true)
  }

  return (
    <main className="page">
      {/* 1. Encabezado principal (Hero) */}
      <section className="container home-hero-split events-hero-split">
        <div className="hero-editorial">
          <p className="eyebrow">Eventos & Mesas Dulces · Santiago</p>
          <h1>Pastelería de autor para <em>celebraciones memorables</em></h1>
          <p className="hero-description">
            Diseñamos mesas dulces minimalistas, tortas nupciales y experiencias corporativas en lotes pequeños, con montaje en terreno y sabores honestos de estación.
          </p>
          <div className="events-hero-cta events-hero-cta-left">
            <a className="button button-primary" href="#cotizador-eventos">
              Cotizar mi evento
            </a>
            <a className="hero-link" href="#paquetes-eventos">
              Ver paquetes por invitados
            </a>
          </div>
        </div>
        <div className="hero-showcase">
          <MediaImage
            className="hero-slide active"
            src={heroEventosImg}
            alt="Mesa dulce de matrimonio Aurum Bakery con torta nupcial en travertino, macarons y tartaletas"
          />
        </div>
      </section>

      {/* 2. Categorías de eventos */}
      <section className="container events-section" aria-label="Categorías de eventos">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Qué celebramos contigo</p>
            <h2>Experiencias a la medida de <em>cada encuentro</em></h2>
          </div>
        </div>
        <div className="events-categories-grid">
          {eventCategories.map((cat) => (
            <article className="event-category-card" key={cat.id}>
              <span>{cat.subtitle}</span>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Propuesta de 3 paquetes de mesas dulces */}
      <section id="paquetes-eventos" className="container events-section" aria-label="Paquetes de mesas dulces">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Propuestas orientativas</p>
            <h2>Paquetes de <em>mesas dulces</em></h2>
          </div>
          <p className="section-side-note">Personalizables en estética, paleta de colores y sabores</p>
        </div>
        <div className="packages-grid">
          {sweetTablePackages.map((pkg) => (
            <article className="package-card" key={pkg.id}>
              <div className="package-card-head">
                <span className="package-kicker">{pkg.badge}</span>
                <h3>{pkg.name}</h3>
                <p className="package-guests">{pkg.guests} invitados · Desde <strong className="tabular-price">{formatCurrency(pkg.priceEstimate)}</strong></p>
                <p className="package-summary">{pkg.summary}</p>
              </div>
              <ul className="package-includes">
                {pkg.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                type="button"
                className="button button-primary package-btn"
                onClick={() => selectPackage(pkg)}
              >
                Cotizar para {pkg.guests} personas
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Carta de sabores */}
      <section className="container events-section" aria-label="Carta de sabores">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Nuestro taller de sabores</p>
            <h2>Carta de <em>bizcochos, rellenos y coberturas</em></h2>
          </div>
        </div>
        <div className="flavors-grid">
          <div className="flavor-column">
            <h3>Bizcochos</h3>
            <ul>
              {flavorMenu.bizcochos.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flavor-column">
            <h3>Rellenos</h3>
            <ul>
              {flavorMenu.rellenos.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flavor-column">
            <h3>Coberturas</h3>
            <ul>
              {flavorMenu.coberturas.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Calculadora y estructura del formulario de cotización */}
      <section id="cotizador-eventos" className="container event-planner">
        <div className="event-planner-copy">
          <p className="eyebrow">Planifica tu experiencia</p>
          <h2>Calcula un presupuesto <em>aproximado</em></h2>
          <p>
            Selecciona el formato que necesitas, el número de invitados y la logística. Completa los datos opcionales de fecha, comuna y sabores para agilizar tu cotización sin demoras.
          </p>
          <ul className="event-benefits">
            <li>Ingredientes nobles y fruta fresca de estación</li>
            <li>Alquiler de soportes en cerámica y travertino disponible</li>
            <li>Respuesta personalizada en menos de 24 horas hábiles</li>
          </ul>
        </div>
        <form className="estimate-card" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="event-offering">Producto o servicio</label>
            <select id="event-offering" value={offeringId} onChange={(event) => setOfferingId(event.target.value)}>
              {eventOfferings.map((item) => <option key={item.id} value={item.id}>{item.name} — {item.detail}</option>)}
            </select>
          </div>
          <div className="form-row-2">
            <div className="form-field">
              <label htmlFor="event-guests">Número de invitados</label>
              <input id="event-guests" type="number" min="1" max="1000" value={guests} onChange={(event) => setGuests(event.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="event-type">Tipo de celebración</label>
              <select id="event-type" value={eventType} onChange={(event) => setEventType(event.target.value)}>
                <option value="Matrimonio / Boda">Matrimonio / Boda</option>
                <option value="Cumpleaños / Aniversario">Cumpleaños / Aniversario</option>
                <option value="Baby Shower / Bautizo">Baby Shower / Bautizo</option>
                <option value="Evento Corporativo">Evento Corporativo</option>
              </select>
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-field">
              <label htmlFor="event-date">Fecha del evento (opcional)</label>
              <input id="event-date" type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="event-commune">Comuna o lugar (opcional)</label>
              <input id="event-commune" type="text" placeholder="Ej. Providencia, Las Condes" value={commune} onChange={(event) => setCommune(event.target.value)} />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="event-service">Logística</label>
            <select id="event-service" value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
              {eventServices.map((item) => <option key={item.id} value={item.id}>{item.name}{item.price ? ` (+${formatCurrency(item.price)})` : ''}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="event-flavors">Sabores o requerimientos especiales (opcional)</label>
            <input
              id="event-flavors"
              type="text"
              placeholder="Ej. Cacao 70% con frutos rojos, opciones sin gluten"
              value={flavorChoice}
              onChange={(event) => setFlavorChoice(event.target.value)}
            />
          </div>
          <div className="estimate-result" aria-live="polite">
            <span>Presupuesto estimado</span>
            <strong className="tabular-price">{formatCurrency(estimate)}</strong>
            <small>{formatCurrency(offering.pricePerGuest)} por invitado + {formatCurrency(service.price)} de logística</small>
          </div>
          <button className="button button-primary" type="submit">Solicitar cotización formal</button>
          {submitted && <p className="form-success" role="status">Perfecto. Revisa los datos en Contacto para enviarnos tu solicitud.</p>}
        </form>
      </section>

      <section className="container event-process">
        <div><span>01.</span><h3>Conversamos</h3><p>Entendemos tu fecha, estilo y número de invitados.</p></div>
        <div><span>02.</span><h3>Diseñamos</h3><p>Preparamos una propuesta con sabores, cantidades y montaje.</p></div>
        <div><span>03.</span><h3>Celebramos</h3><p>Coordinamos cada detalle para que solo te preocupes de disfrutar.</p></div>
      </section>

      {/* 6. Preguntas Frecuentes (FAQ) */}
      <section className="container events-faq" aria-label="Preguntas frecuentes sobre eventos">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Todo sobre reservas, <em>señas y entregas</em></h2>
          </div>
        </div>
        <div className="faq-accordion">
          {eventFaqs.map((item, idx) => {
            const isOpen = openFaq === idx
            return (
              <div className="faq-item" key={item.q}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                >
                  <span>{item.q}</span>
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p className="faq-answer">{item.a}</p>}
              </div>
            )
          })}
        </div>
      </section>

      <section className="container event-cta">
        <p>¿Ya tienes una idea en mente?</p>
        <button className="button button-secondary" onClick={() => onNavigate('contacto')}>Hablar con un especialista</button>
      </section>
    </main>
  )
}