import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatters'
import MediaImage from './MediaImage'

const DELIVERY_FEE = 4500

export default function CartDrawer({ isOpen, onClose, onNavigate }) {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const [deliveryType, setDeliveryType] = useState('retiro')
  const [customerName, setCustomerName] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  if (!isOpen) return null

  const deliveryFee = deliveryType === 'despacho' && items.length > 0 ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  function handleConfirm(event) {
    event.preventDefault()
    const folio = `AUR-${Math.floor(1000 + Math.random() * 9000)}`
    setConfirmedOrder({
      folio,
      customerName: customerName.trim() || 'Invitado',
      deliveryLabel:
        deliveryType === 'despacho'
          ? `Despacho programado · ${deliveryAddress.trim()}`
          : 'Retiro en tienda · Av. Providencia 1234',
      items: [...items],
      total,
    })
    clearCart()
  }

  function handleClose() {
    setConfirmedOrder(null)
    onClose()
  }

  return (
    <div className="drawer-backdrop" role="presentation" onClick={handleClose}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Bolsa de compra"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-drawer-header">
          <div>
            <p className="eyebrow">Selección artesanal</p>
            <h2>Tu bolsa</h2>
          </div>
          <button type="button" className="drawer-close" onClick={handleClose} aria-label="Cerrar bolsa">
            ×
          </button>
        </div>

        <div className="cart-drawer-body">
          {confirmedOrder ? (
            <div className="drawer-receipt">
              <p className="eyebrow">Reserva confirmada</p>
              <h3>Gracias, {confirmedOrder.customerName}</h3>
              <p className="drawer-receipt-meta">
                Folio <strong>{confirmedOrder.folio}</strong> · {confirmedOrder.deliveryLabel}
              </p>
              <ul className="drawer-receipt-items">
                {confirmedOrder.items.map((item) => (
                  <li key={item.key}>
                    <span>{item.quantity} × {item.name} ({item.option})</span>
                    <strong>{formatCurrency(item.unitPrice * item.quantity)}</strong>
                  </li>
                ))}
              </ul>
              <div className="drawer-receipt-total">
                <span>Total estimado</span>
                <strong>{formatCurrency(confirmedOrder.total)}</strong>
              </div>
              <button
                type="button"
                className="button button-primary drawer-full-btn"
                onClick={handleClose}
              >
                Continuar explorando
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="drawer-empty">
              <p>Tu bolsa está vacía.</p>
              <small>Explora nuestras tortas, dulces y panadería de masa madre para armar tu pedido.</small>
              <button
                type="button"
                className="button button-primary"
                onClick={() => {
                  handleClose()
                  onNavigate('catalogo')
                }}
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <>
              <div className="drawer-items">
                {items.map((item) => (
                  <article className="drawer-item" key={item.key}>
                    <MediaImage src={item.image} alt={item.name} className="drawer-item-img" />
                    <div className="drawer-item-info">
                      <span className="drawer-item-meta">{item.category} · {item.option}</span>
                      <h3>{item.name}</h3>
                      <strong className="tabular-price">{formatCurrency(item.unitPrice * item.quantity)}</strong>
                      <div className="drawer-item-actions">
                        <div className="qty-stepper">
                          <button
                            type="button"
                            aria-label={`Disminuir cantidad de ${item.name}`}
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Aumentar cantidad de ${item.name}`}
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="drawer-remove"
                          onClick={() => removeItem(item.key)}
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <form className="drawer-checkout-form" onSubmit={handleConfirm}>
                <div className="form-field">
                  <label htmlFor="drawer-name">Nombre para el pedido</label>
                  <input
                    id="drawer-name"
                    type="text"
                    placeholder="Tu nombre"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="drawer-delivery">Modalidad</label>
                  <select
                    id="drawer-delivery"
                    value={deliveryType}
                    onChange={(event) => setDeliveryType(event.target.value)}
                  >
                    <option value="retiro">Retiro en tienda (Sin costo)</option>
                    <option value="despacho">Despacho programado (+{formatCurrency(DELIVERY_FEE)})</option>
                  </select>
                </div>
                {deliveryType === 'despacho' && (
                  <div className="form-field">
                    <label htmlFor="drawer-address">Dirección de despacho</label>
                    <input
                      id="drawer-address"
                      type="text"
                      placeholder="Calle, número y comuna"
                      value={deliveryAddress}
                      onChange={(event) => setDeliveryAddress(event.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="form-field">
                  <label htmlFor="drawer-notes">Nota o dedicatoria (opcional)</label>
                  <input
                    id="drawer-notes"
                    type="text"
                    placeholder="Mensaje breve o preferencia horaria"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                  />
                </div>
                <div className="drawer-summary">
                  <div>
                    <span>Subtotal</span>
                    <span className="tabular-price">{formatCurrency(subtotal)}</span>
                  </div>
                  <div>
                    <span>Entrega</span>
                    <span className="tabular-price">{deliveryFee === 0 ? 'Gratis' : formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="drawer-total-row">
                    <span>Total</span>
                    <strong className="tabular-price">{formatCurrency(total)}</strong>
                  </div>
                </div>
                <button type="submit" className="button button-primary drawer-full-btn">
                  Confirmar pedido
                </button>
              </form>
            </>
          )}
        </div>
      </aside>
    </div>
  )
}
