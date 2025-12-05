// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext"; // 👈 importar AuthContext

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth(); // 👈 obtener estado de login
  const [cart, setCart] = useState([]);

  // 👉 Función global de toast
  const showToast = (msg, type = "success") => {
    toast[type](msg);
  };

  // 👉 Agregar al carrito (solo si está logueado)
  const addToCart = (product) => {
    if (!isAuthenticated) {
      showToast("Debes iniciar sesión para agregar productos al carrito", "error");
      return;
    }

    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    showToast(`${product.name} agregado al carrito`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
    showToast("Producto eliminado");
  };

  const clearCart = () => {
    setCart([]); // ❗ Sin toast, lo hace el botón pagar
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const cartCount = cart.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        total,
        addToCart,
        removeFromCart,
        clearCart,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 👉 IMPORTANTE: bien escrito, no rompas esto:
export function useCart() {
  return useContext(CartContext);
}
