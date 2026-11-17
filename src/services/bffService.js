import api from './api'

export const bffService = {
  getCatalogView() {
    return api.get('/bff/catalog-view')
  },

  getAdminDashboard() {
    return api.get('/bff/admin-dashboard')
  },
}

export default bffService
