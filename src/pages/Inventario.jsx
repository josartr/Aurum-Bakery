import { useState } from 'react'
import { products } from '../data/products'

// Datos exclusivamente de demostración; NO representan existencias reales.
// La API del backend reemplazará estas cantidades y mínimos.
const ejemplosStock = {
  'prod-1': { stock: 25, minimo: 6 },
  'prod-2': { stock: 3, minimo: 5 },
  'prod-3': { stock: 0, minimo: 2 },
  'prod-4': { stock: 18, minimo: 8 },
  'prod-6': { stock: 4, minimo: 7 },
  'prod-7': { stock: 15, minimo: 5 },
}

const inventarioDemo = products.map((producto) => ({
  id: producto.id,
  nombre: producto.name,
  categoria: producto.category,
  stock: ejemplosStock[producto.id]?.stock ?? 12,
  minimo: ejemplosStock[producto.id]?.minimo ?? 5,
}))

function obtenerEstado(stock, minimo) {
  if (stock === 0) return 'Agotado'
  if (stock <= minimo) return 'Stock bajo'
  return 'Disponible'
}

function TarjetaResumen({ titulo, cantidad }) {
  return (
    <article
      style={{
        background: '#fff',
        padding: '1.25rem',
        border: '1px solid #e7e2d9',
        borderRadius: 12,
      }}
    >
      <p style={{ margin: '0 0 .5rem', color: '#52666a' }}>{titulo}</p>
      <strong style={{ fontSize: '1.6rem' }}>{cantidad}</strong>
    </article>
  )
}

export default function Inventario() {
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('Todos')

  const cantidadBaja = inventarioDemo.filter(
    (producto) => obtenerEstado(producto.stock, producto.minimo) === 'Stock bajo'
  ).length
  const cantidadAgotada = inventarioDemo.filter((producto) => producto.stock === 0).length

  const resultados = inventarioDemo.filter((producto) => {
    const coincideTexto = `${producto.nombre} ${producto.categoria}`
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase())
    const coincideEstado =
      filtroEstado === 'Todos' ||
      obtenerEstado(producto.stock, producto.minimo) === filtroEstado

    return coincideTexto && coincideEstado
  })

  return (
    <main className="page">
      <section className="container">
        <div className="page-heading">
          <p className="eyebrow">Aurum Bakery · Vista de demostración</p>
          <h1>Control de inventario</h1>
          <p className="lead">
            Consulta cantidades simuladas de productos terminados, identifica existencias
            bajas y revisa los artículos agotados.
          </p>
          <p role="note" style={{ color: '#8a6a1c', fontWeight: 600 }}>
            Datos de ejemplo: no representan el stock real ni se guardan en una base de datos.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <TarjetaResumen titulo="Productos del catálogo" cantidad={inventarioDemo.length} />
          <TarjetaResumen titulo="Con stock bajo" cantidad={cantidadBaja} />
          <TarjetaResumen titulo="Agotados" cantidad={cantidadAgotada} />
        </div>

        <section aria-labelledby="inventario-titulo">
          <h2 id="inventario-titulo">Existencias por producto</h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
              alignItems: 'end',
            }}
          >
            <div className="form-field" style={{ flex: '1 1 240px' }}>
              <label htmlFor="inventario-buscar">Buscar producto o categoría</label>
              <input
                id="inventario-buscar"
                type="search"
                placeholder="Ej.: Macarons"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
              />
            </div>
            <div className="form-field" style={{ flex: '1 1 180px' }}>
              <label htmlFor="inventario-filtrar">Filtrar por estado</label>
              <select
                id="inventario-filtrar"
                value={filtroEstado}
                onChange={(event) => setFiltroEstado(event.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Disponible">Disponible</option>
                <option value="Stock bajo">Stock bajo</option>
                <option value="Agotado">Agotado</option>
              </select>
            </div>
          </div>

          <p aria-live="polite" style={{ color: '#52666a' }}>
            Mostrando {resultados.length} de {inventarioDemo.length} productos
          </p>

          <div
            style={{
              overflowX: 'auto',
              background: '#fff',
              border: '1px solid #e7e2d9',
              borderRadius: 12,
            }}
          >
            <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f2ece1' }}>
                  <th scope="col" style={{ padding: '1rem' }}>Producto</th>
                  <th scope="col" style={{ padding: '1rem' }}>Categoría</th>
                  <th scope="col" style={{ padding: '1rem' }}>Stock</th>
                  <th scope="col" style={{ padding: '1rem' }}>Mínimo</th>
                  <th scope="col" style={{ padding: '1rem' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((producto) => {
                  const estado = obtenerEstado(producto.stock, producto.minimo)
                  const color = estado === 'Agotado' ? '#a22b2b' : estado === 'Stock bajo' ? '#886316' : '#1c7049'

                  return (
                    <tr key={producto.id} style={{ borderTop: '1px solid #e7e2d9' }}>
                      <td style={{ padding: '1rem' }}>{producto.nombre}</td>
                      <td style={{ padding: '1rem' }}>{producto.categoria}</td>
                      <td style={{ padding: '1rem' }}>{producto.stock}</td>
                      <td style={{ padding: '1rem' }}>{producto.minimo}</td>
                      <td style={{ padding: '1rem', color, fontWeight: 600 }}>{estado}</td>
                    </tr>
                  )
                })}
                {resultados.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '1rem' }}>
                      No encontramos productos con esos filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p style={{ color: '#52666a', marginTop: '1rem' }}>
            Vista de solo lectura. Las entradas, ventas, ajustes y alertas reales se
            conectarán al backend con permisos de administrador.
          </p>
          <a href="#/admin-preview" className="button button-primary" style={{ marginTop: '1rem' }}>
            Volver al panel de administración
          </a>
        </section>
      </section>
    </main>
  )
}
