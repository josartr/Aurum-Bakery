export function ProductCardSkeleton() {
  return (
    <div className="product-card product-card-skeleton" aria-hidden="true">
      <div className="product-image-wrap skeleton-block skeleton-media" />
      <div className="product-card-body">
        <div className="skeleton-meta-row">
          <span className="skeleton-block skeleton-line skeleton-line-sm" />
          <span className="skeleton-block skeleton-line skeleton-line-xs" />
        </div>
        <span className="skeleton-block skeleton-line skeleton-title" />
        <span className="skeleton-block skeleton-line skeleton-text" />
        <span className="skeleton-block skeleton-line skeleton-text-short" />
        <div className="product-card-footer">
          <div className="product-card-price-row">
            <span className="skeleton-block skeleton-line skeleton-price" />
            <span className="skeleton-block skeleton-link" />
          </div>
          <span className="skeleton-block skeleton-btn-full" />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <section
      className="container product-grid"
      aria-label="Cargando creaciones del catálogo"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Cargando catálogo de productos...</span>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </section>
  )
}
