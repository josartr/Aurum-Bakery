import { useEffect, useRef, useState } from 'react'
import MediaImage from '../components/MediaImage'
import { ProductGridSkeleton } from '../components/ProductSkeleton'
import { productService } from '../services'
import { useCart } from '../hooks/useCart'
import { formatCurrency } from '../utils/formatters'

const CATEGORY_ORDER = ['Todos', 'Tortas', 'Bollería', 'Pasteles', 'Galletas', 'Panadería', 'Brunch']

export default function Catalogo({ onOpenCart, loading = false }) {
  const { addItem } = useCart()
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectionError, setSelectionError] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [addedKey, setAddedKey] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const filterTimerRef = useRef(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await productService.getAll()
        setProducts(data || [])
      } catch (error) {
        console.error('Error loading products', error)
        setFetchError('No se pudieron cargar los productos.')
        setProducts([])
      }
    }

    loadProducts()

    return () => {
      if (filterTimerRef.current) window.clearTimeout(filterTimerRef.current)
    }
  }, [])

  const availableCategories = new Set(products.map((product) => product.category))
  const categories = CATEGORY_ORDER.filter((cat) => cat === 'Todos' || availableCategories.has(cat))

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory
    const searchTerm = search.trim().toLowerCase()
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.options || []).some((opt) => opt.toLowerCase().includes(searchTerm))

    return matchesCategory && matchesSearch
  })

  const showSkeleton = loading || isTransitioning

  function handleCategorySelect(category) {
    if (category === activeCategory) return
    setActiveCategory(category)
    if (filterTimerRef.current) window.clearTimeout(filterTimerRef.current)
    setIsTransitioning(true)
    filterTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false)
    }, 220)
  }

  function handleResetFilters() {
    if (filterTimerRef.current) window.clearTimeout(filterTimerRef.current)
    setIsTransitioning(false)
    setSearch('')
    setActiveCategory('Todos')
  }

  function requiresSelection(product) {
    return (product.sizes?.length || 0) > 1 || (product.options?.length || 0) > 1
  }

  function openDetail(product) {
    setSelectedProduct(product)
    setSelectedOption(product.options?.length > 1 ? '' : product.options?.[0] || 'Clásico')
    setSelectedSize(product.sizes?.length === 1 ? product.sizes[0] : null)
    setSelectionError('')
  }

  function handleAdd(product, option = '', sizeObj = null) {
    const chosenSize = sizeObj || product.sizes?.[0] || null
    const chosenOption = option || product.options?.[0] || 'Clásico'
    const productToAdd = chosenSize
      ? { ...product, price: chosenSize.price, unit: chosenSize.label }
      : product
    const finalOption = chosenSize ? `${chosenSize.label} · ${chosenOption}` : chosenOption

    addItem(productToAdd, finalOption, 1)
    const key = product.id || product.name
    setAddedKey(key)
    window.setTimeout(() => {
      setAddedKey((current) => (current === key ? '' : current))
    }, 1500)
  }

  function handleCardAddClick(product) {
    if (requiresSelection(product)) {
      openDetail(product)
      return
    }
    handleAdd(product)
  }

  function handleModalAdd() {
    if (!selectedProduct) return
    const needsSize = (selectedProduct.sizes?.length || 0) > 1 && !selectedSize
    const needsOption = (selectedProduct.options?.length || 0) > 1 && !selectedOption

    if (needsSize && needsOption) {
      setSelectionError('Selecciona un tamaño y una variedad para añadir al carrito.')
      return
    }
    if (needsSize) {
      setSelectionError('Selecciona un tamaño para añadir al carrito.')
      return
    }
    if (needsOption) {
      setSelectionError('Selecciona una variedad o sabor para añadir al carrito.')
      return
    }

    handleAdd(selectedProduct, selectedOption, selectedSize)
    setSelectedProduct(null)
    if (onOpenCart) onOpenCart()
  }

  return (
    <main className="page">
      <section className="container page-heading">
        <p className="eyebrow">Colección 2026</p>
        <h1>Descubre nuestras <em>creaciones</em></h1>
        <p className="lead">Una selección de tortas, pasteles, bollería hojaldrada y galletas artesanales horneadas en lotes pequeños.</p>
      </section>

      <section className="container catalog-toolbar" aria-label="Filtros del catálogo">
        <div className="category-filters" role="group" aria-label="Filtrar por categoría">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? 'filter-button active' : 'filter-button'}
              onClick={() => handleCategorySelect(category)}
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
            placeholder="Buscar creación o relleno"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </section>

      <section className="container catalog-summary" aria-live="polite">
        <p>
          {showSkeleton ? (
            'Actualizando vitrina...'
          ) : (
            <>
              <strong>{filteredProducts.length}</strong>{' '}
              {filteredProducts.length === 1 ? 'creación disponible' : 'creaciones disponibles'}
            </>
          )}
        </p>
        <p>Producción artesanal en lotes pequeños</p>
      </section>

      {fetchError && (
        <div className="container">
          <p className="form-error">{fetchError}</p>
        </div>
      )}

      {showSkeleton ? (
        <ProductGridSkeleton count={activeCategory === 'Todos' ? 6 : 3} />
      ) : (
        <section className="container product-grid" aria-label="Productos del catálogo">
          {filteredProducts.map((product) => {
            const productKey = product.id || product.name
            const isAdded = addedKey === productKey
            return (
              <article className="product-card" key={productKey}>
                <div className="product-image-wrap" onClick={() => openDetail(product)}>
                  <MediaImage src={product.image} alt={product.name} />
                </div>
                <div className="product-card-body">
                  <div className="product-card-meta">
                    <span>{product.category} · {product.unit}</span>
                    {product.badge && <span className="product-kicker">{product.badge}</span>}
                  </div>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="product-card-footer">
                    <div className="product-card-price-row">
                      <strong className="tabular-price">
                        {product.sizes ? `Desde ${formatCurrency(product.sizes[0].price)}` : formatCurrency(product.price)}
                      </strong>
                      <button className="text-button" onClick={() => openDetail(product)}>
                        Ver detalle <span aria-hidden="true">→</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      className="add-link-btn"
                      onClick={() => handleCardAddClick(product)}
                    >
                      {isAdded ? 'Agregado ✓' : 'Añadir al carrito'}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      )}

      {!showSkeleton && filteredProducts.length === 0 && (
        <div className="container empty-catalog">
          <p className="eyebrow">Sin resultados</p>
          <h2>No encontramos esa creación</h2>
          <p>Prueba con otro término o revisa todas nuestras categorías.</p>
          <button className="button button-primary" onClick={handleResetFilters}>
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
            <div className="modal-grid">
              <div className="modal-media">
                <MediaImage src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-info">
                <p className="eyebrow">
                  {selectedProduct.category} · {selectedSize ? selectedSize.label : selectedProduct.unit}
                </p>
                <h2 id="product-modal-title">{selectedProduct.name}</h2>
                <p className="modal-price tabular-price">
                  {selectedProduct.sizes && !selectedSize
                    ? `Desde ${formatCurrency(selectedProduct.sizes[0].price)}`
                    : formatCurrency(selectedSize ? selectedSize.price : selectedProduct.price)}
                </p>
                <p className="modal-details-copy">{selectedProduct.details}</p>

                {selectedProduct.sizes && (
                  <>
                    <h3>Tamaño disponible</h3>
                    <ul className="modal-options-list modal-sizes-list">
                      {selectedProduct.sizes.map((size) => (
                        <li key={size.label}>
                          <button
                            type="button"
                            className={selectedSize?.label === size.label ? 'option-chip active' : 'option-chip'}
                            onClick={() => {
                              setSelectedSize(size)
                              setSelectionError('')
                            }}
                          >
                            {size.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h3>Variedades disponibles</h3>
                <ul className="modal-options-list">
                  {(selectedProduct.options || ['Clásico']).map((option) => (
                    <li key={option}>
                      <button
                        type="button"
                        className={selectedOption === option ? 'option-chip active' : 'option-chip'}
                        onClick={() => {
                          setSelectedOption(option)
                          setSelectionError('')
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
                {selectionError && (
                  <p className="modal-selection-hint" role="alert">
                    {selectionError}
                  </p>
                )}
                <div className="modal-buy-row">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={handleModalAdd}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}