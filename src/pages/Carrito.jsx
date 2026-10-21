import { formatCurrency } from '../utils/formatters'

export default function Carrito({ cart, onUpdateQuantity, onRemoveFromCart, onNavigate }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = cart.length > 0 ? 3000 : 0
  const total = subtotal + deliveryFee

  return (
    <main className="page">
      <section className="container page-heading">
        <p className="eyebrow">Tu compra</p>
        <h1>Carrito <em>de productos</em></h1>
      </section>

      <section className="container cart-layout">
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p className="eyebrow">Vacío</p>
              <h2>Aún no agregas productos</h2>
              <p>Descubre nuestras creaciones y arma tu selección favorita.</p>
              <button className="button button-primary" onClick={() => onNavigate('catalogo')}>
                Ir al catálogo
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <article className="cart-item" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-body">
                  <div>
                    <p className="cart-item-category">{item.category}</p>
                    <h2>{item.name}</h2>
                  </div>
                  <div className="cart-item-controls">
                    <label>
                      <span>Cantidad</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => onUpdateQuantity(item.name, Number(event.target.value))}
                      />
                    </label>
                    <button className="text-button" onClick={() => onRemoveFromCart(item.name)}>
                      Eliminar
                    </button>
                  </div>
                </div>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </article>
            ))
          )}
        </div>

        <aside className="cart-summary">
          <h2>Resumen</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Despacho</span>
            <strong>{formatCurrency(deliveryFee)}</strong>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <button className="button button-primary" disabled={cart.length === 0} onClick={() => onNavigate('contacto')}>
            Continuar compra
          </button>
        </aside>
      </section>
    </main>
  )
}
