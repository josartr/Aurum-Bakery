import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { bffService, contactService, productService } from '../services'

export default function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [messageError, setMessageError] = useState('')
  const [messageSuccess, setMessageSuccess] = useState('')
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Tortas',
    imageUrl: '',
  })

  const totalProducts = useMemo(
    () => products.length || stats?.totalProducts || 0,
    [products, stats],
  )

  const unreadCount = useMemo(() => {
    if (messages.length > 0) {
      return messages.filter((message) => message.status === 'UNREAD').length
    }
    return stats?.unreadMessagesCount ?? 0
  }, [messages, stats])

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [dashboardRes, productsRes, messagesRes] = await Promise.all([
          bffService.getAdminDashboard(),
          productService.getAll(),
          contactService.getAll(),
        ])

        setStats(dashboardRes?.data || null)
        setProducts(productsRes?.data || [])
        setMessages(messagesRes?.data || [])
      } catch (error) {
        console.error('Error loading admin data', error)
        setMessageError('No se pudo cargar el panel administrativo.')
      } finally {
        setLoading(false)
      }
    }

    loadAdminData()
  }, [])

  const handleProductChange = (event) => {
    const { name, value } = event.target
    setProductForm((current) => ({ ...current, [name]: value }))
  }

  const handleProductSubmit = async (event) => {
    event.preventDefault()
    setMessageError('')
    setMessageSuccess('')

    try {
      const payload = {
        name: productForm.name.trim(),
        description: productForm.description.trim(),
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        category: productForm.category,
        imageUrl: productForm.imageUrl.trim(),
      }

      const { data } = await productService.create(payload)
      setProducts((current) => [data, ...current])
      setStats((current) =>
        current ? { ...current, totalProducts: (current.totalProducts ?? 0) + 1 } : current,
      )
      setProductForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'Tortas',
        imageUrl: '',
      })
      setMessageSuccess('Producto guardado correctamente.')
    } catch (error) {
      console.error('Error creating product', error)
      setMessageError(error?.response?.data?.message || 'No se pudo crear el producto.')
    }
  }

  const handleDeleteProduct = async (id) => {
    setMessageError('')
    setMessageSuccess('')
    try {
      await productService.delete(id)
      setProducts((current) => current.filter((product) => product.id !== id))
      setStats((current) =>
        current ? { ...current, totalProducts: Math.max(0, (current.totalProducts ?? 1) - 1) } : current,
      )
      setMessageSuccess('Producto eliminado correctamente.')
    } catch (error) {
      console.error('Error deleting product', error)
      setMessageError(error?.response?.data?.message || 'No se pudo eliminar el producto.')
    }
  }

  const handleMarkAsRead = async (id) => {
    setMessageError('')
    try {
      const { data } = await contactService.markAsRead(id)
      setMessages((current) =>
        current.map((message) =>
          message.id === id ? { ...message, status: data?.status || 'READ' } : message,
        ),
      )
    } catch (error) {
      console.error('Error updating message', error)
      setMessageError(error?.response?.data?.message || 'No se pudo actualizar el mensaje.')
    }
  }

  const handleDeleteMessage = async (id) => {
    setMessageError('')
    try {
      await contactService.delete(id)
      setMessages((current) => current.filter((message) => message.id !== id))
    } catch (error) {
      console.error('Error deleting message', error)
      setMessageError(error?.response?.data?.message || 'No se pudo eliminar el mensaje.')
    }
  }

  return (
    <main className="page">
      <section className="container page-heading">
        <p className="eyebrow">Panel de administración</p>
        <h1>Bienvenido, {user?.fullName || user?.email}</h1>
        <button className="button button-primary" onClick={logout}>Cerrar sesión</button>
      </section>

      {messageError && (
        <div className="container">
          <p className="form-error" role="alert">{messageError}</p>
        </div>
      )}

      {messageSuccess && (
        <div className="container">
          <p className="form-success" role="status">{messageSuccess}</p>
        </div>
      )}

      {loading ? (
        <section className="container">
          <p>Cargando métricas...</p>
        </section>
      ) : (
        <>
          <section className="container" style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '2rem' }}>
            <article className="auth-card" style={{ padding: '1.5rem' }}>
              <p className="eyebrow">Usuarios</p>
              <h2>{stats?.totalUsers ?? 0}</h2>
            </article>
            <article className="auth-card" style={{ padding: '1.5rem' }}>
              <p className="eyebrow">Productos</p>
              <h2>{totalProducts}</h2>
            </article>
            <article className="auth-card" style={{ padding: '1.5rem' }}>
              <p className="eyebrow">Mensajes sin leer</p>
              <h2>{unreadCount}</h2>
            </article>
          </section>

          <section className="container" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1.1fr 1fr' }}>
            <div className="auth-card" style={{ padding: '1.5rem' }}>
              <p className="eyebrow">Crear producto</p>
              <form onSubmit={handleProductSubmit} className="auth-form">
                <label>
                  <span>Nombre</span>
                  <input name="name" value={productForm.name} onChange={handleProductChange} required />
                </label>
                <label>
                  <span>Descripción</span>
                  <textarea name="description" value={productForm.description} onChange={handleProductChange} rows="3" required />
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <label>
                    <span>Precio</span>
                    <input type="number" min="0" name="price" value={productForm.price} onChange={handleProductChange} required />
                  </label>
                  <label>
                    <span>Stock</span>
                    <input type="number" min="0" name="stock" value={productForm.stock} onChange={handleProductChange} required />
                  </label>
                </div>
                <label>
                  <span>Categoría</span>
                  <select name="category" value={productForm.category} onChange={handleProductChange}>
                    <option value="Tortas">Tortas</option>
                    <option value="Bollería">Bollería</option>
                    <option value="Pasteles">Pasteles</option>
                    <option value="Galletas">Galletas</option>
                    <option value="Panadería">Panadería</option>
                    <option value="Brunch">Brunch</option>
                  </select>
                </label>
                <label>
                  <span>URL de imagen</span>
                  <input name="imageUrl" value={productForm.imageUrl} onChange={handleProductChange} placeholder="https://..." />
                </label>
                <button type="submit" className="button button-primary">Guardar producto</button>
              </form>
            </div>

            <div className="auth-card" style={{ padding: '1.5rem' }}>
              <p className="eyebrow">Productos</p>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {products.length === 0 ? (
                  <p>No hay productos disponibles.</p>
                ) : (
                  products.map((product) => (
                    <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                      <div>
                        <strong>{product.name}</strong>
                        <div className="small">{product.category} · ${Number(product.price).toLocaleString('es-CL')} · Stock: {product.stock}</div>
                      </div>
                      <button className="button button-primary" type="button" onClick={() => handleDeleteProduct(product.id)}>
                        Eliminar
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="container" style={{ marginTop: '2rem' }}>
            <div className="auth-card" style={{ padding: '1.5rem' }}>
              <p className="eyebrow">Mensajes de contacto</p>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {messages.length === 0 ? (
                  <p>No tienes mensajes.</p>
                ) : (
                  messages.map((message) => {
                    const isUnread = message.status === 'UNREAD'
                    const statusLabel = message.status === 'REPLIED'
                      ? 'Respondido'
                      : isUnread
                        ? 'Nuevo'
                        : 'Leído'

                    return (
                      <div key={message.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <strong>{message.name}</strong>
                          <span>{statusLabel}</span>
                        </div>
                        <div>{message.email}{message.phone ? ` · ${message.phone}` : ''}</div>
                        <div><strong>{message.subject}</strong></div>
                        <p>{message.message}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {isUnread && (
                            <button type="button" className="button button-primary" onClick={() => handleMarkAsRead(message.id)}>
                              Marcar como leído
                            </button>
                          )}
                          <button type="button" className="text-button" onClick={() => handleDeleteMessage(message.id)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
