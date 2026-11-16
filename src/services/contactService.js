import api from './api'

export const contactService = {
  send(payload) {
    return api.post('/contact', payload)
  },

  getAll() {
    return api.get('/contact')
  },

  markAsRead(id) {
    return api.patch(`/contact/${id}/read`)
  },
}

export default contactService
