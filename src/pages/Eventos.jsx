import { useState } from 'react'
import { formatCurrency } from '../utils/formatters'

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

export default function Eventos({ onNavigate }) {
  const [guests, setGuests] = useState(30)
  const [offeringId, setOfferingId] = useState(eventOfferings[0].id)
  const [serviceId, setServiceId] = useState(eventServices[1].id)
  const [submitted, setSubmitted] = useState(false)
  const offering = eventOfferings.find((item) => item.id === offeringId)
  const service = eventServices.find((item) => item.id === serviceId)
  const estimate = (Number(guests) || 0) * offering.pricePerGuest + service.price

  function handleSubmit(event) {
  event.preventDefault()
  onNavigate('contacto')
  setSubmitted(true)
}

  return (
    <main className="page">
      <section className="container page-heading">
        <p className="eyebrow">Celebraciones</p>
        <h1>Haz de tu evento algo <em>memorable</em></h1>
        <p className="lead">Creamos experiencias dulces para matrimonios, celebraciones, empresas y eventos especiales.</p>
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