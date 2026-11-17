import { products as staticProducts } from '../data/products'

const normalizeName = (value) => String(value || '').trim().toLowerCase()

const templateByName = new Map(
  staticProducts.map((item) => [normalizeName(item.name), item]),
)

const templateOrderByName = new Map(
  staticProducts.map((item, index) => [normalizeName(item.name), index]),
)

const imageByKey = new Map(
  staticProducts.map((item) => {
    const fileName = String(item.image || '').split('/').pop()
    return [fileName, item.image]
  }),
)

const fallbackImage = staticProducts[0]?.image || ''

export function resolveCatalogImage(imageUrl, templateImage = '') {
  if (templateImage) return templateImage
  if (!imageUrl) return fallbackImage

  const fileName = String(imageUrl).split('/').pop()
  if (fileName && imageByKey.has(fileName)) {
    return imageByKey.get(fileName)
  }

  return imageUrl
}

export function mergeCatalogProducts(apiProducts) {
  if (!Array.isArray(apiProducts) || apiProducts.length === 0) {
    return staticProducts
  }

  const mapped = apiProducts.map((apiProduct) => {
    const key = normalizeName(apiProduct.name)
    const template = templateByName.get(key)
    const numericPrice = Number(apiProduct.price)

    if (template) {
      const hasSizes = Array.isArray(template.sizes) && template.sizes.length > 0
      const basePrice = Number.isFinite(numericPrice) ? numericPrice : template.price
      const updatedSizes = hasSizes
        ? template.sizes.map((size, idx) =>
            idx === 0 && basePrice !== template.sizes[0].price
              ? { ...size, price: basePrice }
              : size,
          )
        : undefined

      return {
        ...template,
        id: apiProduct.id ?? template.id,
        name: apiProduct.name || template.name,
        category: apiProduct.category || template.category,
        description: apiProduct.description ?? template.description,
        price: basePrice,
        stock: apiProduct.stock ?? 20,
        active: apiProduct.active ?? true,
        image: resolveCatalogImage(apiProduct.imageUrl, template.image),
        ...(updatedSizes ? { sizes: updatedSizes } : {}),
      }
    }

    return {
      id: apiProduct.id,
      name: apiProduct.name,
      category: apiProduct.category || 'Pasteles',
      description: apiProduct.description || '',
      details: apiProduct.description || 'Creación artesanal de Aurum Bakery.',
      image: resolveCatalogImage(apiProduct.imageUrl),
      options: ['Clásico'],
      price: Number.isFinite(numericPrice) ? numericPrice : 0,
      stock: apiProduct.stock ?? 0,
      unit: apiProduct.stock != null ? `Stock: ${apiProduct.stock}` : 'Disponible',
      badge: 'Nuevo',
      featured: false,
      active: apiProduct.active ?? true,
    }
  })

  return mapped.sort((a, b) => {
    const aIdx = templateOrderByName.get(normalizeName(a.name))
    const bIdx = templateOrderByName.get(normalizeName(b.name))
    if (aIdx === undefined && bIdx === undefined) return 0
    if (aIdx === undefined) return -1
    if (bIdx === undefined) return 1
    return aIdx - bIdx
  })
}
