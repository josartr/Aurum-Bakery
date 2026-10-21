import { useState } from 'react'
import { products } from '../data/products'
import { formatCurrency } from '../utils/formatters'

export default function Catalogo({ onAddToCart, onNavigate }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const categories = ['Todos', ...new Set(products.map((product) => product.category))]
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory
    const searchTerm = search.trim().toLowerCase()
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)

    return matchesCategory && matchesSearch
  })

  return (
    <main className="page">
      <section className="container page-heading">
        <p className="eyebrow">Colección 2026</p>
        <h1>Descubre nuestras <em>creaciones</em></h1>
        <p className="lead">Una selección de piezas artesanales para tus días especiales, tus regalos y tus celebraciones.</p>
      </section>
      <section className="container catalog-toolbar" aria-label="Filtros del catálogo">
        <div className="category-filters" role="group" aria-label="Filtrar por categoría">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'filter-button active' : 'filter-button'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="sr-only">Buscar en el catálogo</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Buscar una creación"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </section>
      <section className="container catalog-summary" aria-live="polite">
        <p><strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'creación disponible' : 'creaciones disponibles'}</p>
        <p>Producción artesanal en lotes pequeños</p>
      </section>
      <section className="container product-grid" aria-label="Productos del catálogo">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.name}>
            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} />
              {product.badge && <span className="product-badge">{product.badge}</span>}
            </div>
            <div className="product-card-body">
              <div className="product-card-meta">
                <span>{product.category}</span>
                <span>{product.unit}</span>
              </div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-card-footer">
                <strong>{formatCurrency(product.price)}</strong>
                <div className="product-actions">
                  <button className="text-button" onClick={() => setSelectedProduct(product)}>
                    Ver detalle <span aria-hidden="true">→</span>
                  </button>
                  <button className="button button-primary add-cart-btn" onClick={() => onAddToCart(product)}>
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
      {filteredProducts.length === 0 && (
        <div className="container empty-catalog">
          <p className="eyebrow">Sin resultados</p>
          <h2>No encontramos esa creación</h2>
          <p>Prueba con otro término o revisa todas nuestras categorías.</p>
          <button className="button button-secondary" onClick={() => { setSearch(''); setActiveCategory('Todos') }}>
            Ver todo el catálogo
          </button>
        </div>
      )}
      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}>
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Cerrar detalles">
              ×
            </button>
            <p className="eyebrow">Creación artesanal</p>
            <h2 id="product-modal-title">{selectedProduct.name}</h2>
            <p className="modal-price">{formatCurrency(selectedProduct.price)} <span>{selectedProduct.unit}</span></p>
            <p>{selectedProduct.details}</p>
            <h3>Variedades disponibles</h3>
            <ul>
              {selectedProduct.options.map((option) => <li key={option}>{option}</li>)}
            </ul>
            <div className="modal-actions">
              <button className="button button-primary" onClick={() => onAddToCart(selectedProduct)}>
                Agregar al carrito
              </button>
              <button className="button button-secondary" onClick={() => onNavigate('carrito')}>
                Ver carrito
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}