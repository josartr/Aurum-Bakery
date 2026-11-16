import { useState } from 'react'
import { products } from '../data/products'
import { formatCurrency } from '../utils/formatters'

function ResumenCard({ titulo, valor }) {
  return (
    <article style={{ background: '#fff', padding: '1.25rem', borderRadius: 12, border: '1px solid #e7e2d9' }}>
      <p style={{ margin: '0 0 .5rem', color: '#52666a' }}>{titulo}</p>
      <strong style={{ fontSize: '1.6rem' }}>{valor}</strong>
    </article>
  )
}

export default function AdminDashboard() {
  const [busqueda, setBusqueda] = useState('')
  const productosFiltrados = products.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.trim().toLowerCase())
  )
  const categorias = new Set(products.map((producto) => producto.category)).size

  return (
    <main className="page">
      <section className="container">
        <div className="page-heading">
          <p className="eyebrow">Aurum Bakery · Vista de demostración</p>
          <h1>Panel de administración</h1>
          <p className="lead">
            Vista preliminar del catálogo. Pedidos, edición y permisos estarán disponibles
            cuando se conecte el backend.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <ResumenCard titulo="Productos" valor={products.length} />
          <ResumenCard titulo="Categorías" valor={categorias} />
          <ResumenCard titulo="Pedidos" valor="Pendiente de API" />
        </div>

        
        <div style={{ marginBottom: '2rem' }}>
          <a href="#/inventario-preview" className="button button-primary">
            Ver inventario y stock
          </a>
        </div>

        <section aria-labelledby="admin-productos">
          <h2 id="admin-productos">Catálogo de productos</h2>
          <div className="form-field" style={{ maxWidth: 440, marginBottom: '1.5rem' }}>
            <label htmlFor="admin-buscar">Buscar un producto</label>
            <input
              id="admin-buscar"
              type="search"
              placeholder="Ej.: Macarons"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>

          <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #e7e2d9', borderRadius: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500, textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f2ece1' }}>
                  <th scope="col" style={{ padding: '1rem' }}>Producto</th>
                  <th scope="col" style={{ padding: '1rem' }}>Categoría</th>
                  <th scope="col" style={{ padding: '1rem' }}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((producto) => (
                  <tr key={producto.id} style={{ borderTop: '1px solid #e7e2d9' }}>
                    <td style={{ padding: '1rem' }}>{producto.name}</td>
                    <td style={{ padding: '1rem' }}>{producto.category}</td>
                    <td style={{ padding: '1rem' }}>{formatCurrency(producto.price)}</td>
                  </tr>
                ))}
                {productosFiltrados.length === 0 && (
                  <tr><td colSpan={3} style={{ padding: '1rem' }}>No se encontraron productos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1rem', color: '#52666a' }}>
            Vista solo lectura. No permite crear, editar ni eliminar productos.
          </p>
        </section>
      </section>
    </main>
  )
}
