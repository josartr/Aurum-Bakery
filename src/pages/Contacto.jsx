import { useState } from 'react'
import { formatCurrency } from '../utils/formatters'

export default function Contacto({ quote = null })  {
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
            <textarea id="message"name="message"rows="5"placeholder="Fecha, cantidad de personas, sabores o cualquier detalle importante"
defaultValue={quote
    ? `Solicito cotización de ${quote.offering} para ${quote.guests} invitados. Logística: ${quote.service}. Presupuesto estimado: ${formatCurrency(quote.estimate)}.`
    : ''}
  required
/>
          </div>
          <button className="button button-primary" type="submit">Enviar consulta</button>
          {submitted && <p className="form-success" role="status">Gracias por escribirnos. Simulación completada. Tu consulta no se ha enviado ni guardado.</p>}
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