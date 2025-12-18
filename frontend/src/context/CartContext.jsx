import React, { createContext, useContext, useState, useReducer } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload]
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload)
    case 'CLEAR_CART':
      return []
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [])
  const [currentPhoto, setCurrentPhoto] = useState(null)

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item })
  }

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const getCartCount = () => {
    return cart.length
  }

  return (
    <CartContext.Provider value={{
      cart,
      currentPhoto,
      setCurrentPhoto,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}