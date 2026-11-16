export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (!user || user.role !== 'ADMIN') {
    window.location.href = '/login'
    return null
  }

  return children
}
