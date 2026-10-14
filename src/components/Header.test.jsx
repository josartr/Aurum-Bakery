import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Componente Header', () => {
  it('renderiza el título de la panadería correctamente', () => {
    // Simulamos que el componente se carga en la página de inicio
    render(<Header page="inicio" onNavigate={() => {}} />)
    
    // Buscamos el texto ignorando mayúsculas y minúsculas (la 'i' al final)
    const logoElement = screen.getByText(/Aurum Bakery/i)
    
    // Verificamos que el elemento esté en el documento
    expect(logoElement).toBeInTheDocument()
  })
})