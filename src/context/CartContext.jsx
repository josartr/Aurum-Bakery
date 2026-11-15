import { useCallback, useEffect, useState } from 'react'
import { CartContext } from './cartContextObject'

const CART_KEY = 'aurum_cart_items'

function readInitialCart() {
  try {
    const raw = window.localStorage.getItem(CART_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitialCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch {
      // ignore storage errors
    }
  }, [items])

  const addItem = useCallback((product, option = '', quantity = 1) => {
    const chosenOption = option || product.options?.[0] || 'Clásico'
    const key = `${product.id || product.name}::${chosenOption}`
    const qty = Math.max(1, Number(quantity) || 1)

    setItems((current) => {
      const existing = current.find((item) => item.key === key)
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + qty } : item,
        )
      }
      return [
        ...current,
        {
          key,
          productId: product.id || product.name,
          name: product.name,
          category: product.category,
          unit: product.unit,
          unitPrice: product.price,
          image: product.image,
          option: chosenOption,
          quantity: qty,
        },
      ]
    })
  }, [])

  const updateQuantity = useCallback((key, quantity) => {
    const nextQty = Number(quantity)
    if (!Number.isFinite(nextQty) || nextQty <= 0) {
      setItems((current) => current.filter((item) => item.key !== key))
      return
    }
    setItems((current) =>
      current.map((item) => (item.key === key ? { ...item, quantity: Math.min(99, nextQty) } : item)),
    )
  }, [])

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((item) => item.key !== key))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
