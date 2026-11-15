import { useContext } from 'react'
import { CartContext } from '../context/cartContextObject'

const fallbackCart = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
}

export function useCart() {
  return useContext(CartContext) || fallbackCart
}
