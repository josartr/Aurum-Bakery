import api from './api'

export const bffService = {
  getAdminDashboard() {
    return api.get('/bff/admin-dashboard')
  },
}

export default bffService
