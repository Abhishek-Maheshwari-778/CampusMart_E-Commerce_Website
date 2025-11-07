import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    totalItems: 0,
    shipping: 0,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart items
  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/cart');
      setCartItems(response.data.cartItems);
      setCartSummary(response.data.summary);
    } catch (error) {
      console.error('Error loading cart:', error);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1, options = {}) => {
    try {
      setError(null);
      const cartData = {
        productId,
        quantity,
        ...options
      };
      const response = await axios.post('/cart/add', cartData);
      setCartItems(response.data.cart);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      setError(null);
      const response = await axios.put(`/cart/update/${productId}`, { quantity });
      setCartItems(response.data.cart);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update quantity';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      setError(null);
      await axios.delete(`/cart/remove/${productId}`);
      await loadCart(); // Reload cart after removal
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to remove item from cart';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setError(null);
      await axios.delete('/cart/clear');
      setCartItems([]);
      setCartSummary({
        subtotal: 0,
        totalItems: 0,
        shipping: 0,
        total: 0
      });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to clear cart';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    cartItems,
    cartSummary,
    loading,
    error,
    loadCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};