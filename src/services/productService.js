import api from './api'

export const productService = {
  getAll(params = {}) {
    return api.get('/products', { params })
  },

  getById(id) {
    return api.get(`/products/${id}`)
  },

  create(productData) {
    return api.post('/products', productData)
  },

  update(id, productData) {
    return api.put(`/products/${id}`, productData)
  },

  delete(id) {
    return api.delete(`/products/${id}`)
  },
}

export default productService
