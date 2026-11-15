import { BrandMark } from './BrandLogo'

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <div className="footer-brand-lockup">
            <BrandMark size={30} className="brand-mark" />
            <h2>Aurum Bakery</h2>
          </div>
          <p>Pastelería artesanal y panadería de masa madre en lotes pequeños.</p>
        </div>
        <div className="footer-meta-col">
          <span>Av. Providencia 1234, Santiago</span>
          <span>Lun – Sáb · 09:00 a 19:00</span>
          <a href="mailto:hola@aurumbakery.cl">hola@aurumbakery.cl</a>
        </div>
        {onNavigate && (
          <nav className="footer-links" aria-label="Navegación del pie de página">
            <button type="button" onClick={() => onNavigate('inicio')}>Inicio</button>
            <button type="button" onClick={() => onNavigate('catalogo')}>Catálogo</button>
            <button type="button" onClick={() => onNavigate('nosotros')}>Acerca de nosotros</button>
            <button type="button" onClick={() => onNavigate('eventos')}>Eventos</button>
            <button type="button" onClick={() => onNavigate('contacto')}>Contacto</button>
          </nav>
        )}
      </div>
      <div className="container footer-bottom">
        <small>© 2026 Aurum Bakery. Todos los derechos reservados.</small>
      </div>
    </footer>
  )
}

export default Footer