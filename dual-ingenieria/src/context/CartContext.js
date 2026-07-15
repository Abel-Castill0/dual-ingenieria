"use client";

import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleItem = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        if (existing.qty >= 99) return prev;
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
        )
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const sendWhatsApp = useCallback(() => {
    if (cart.length === 0) return;
    const lines = cart.map((i) => `• ${i.name} x${i.qty}`);
    const msg = `¡Hola! Quiero cotizar los siguientes productos:\n\n${lines.join("\n")}\n\nDesde la tienda de Dual Ingeniería.`;
    window.open(
      `https://api.whatsapp.com/send/?phone=51973042657&text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, showCart, setShowCart, toggleItem, updateQty, removeItem, totalItems, sendWhatsApp }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
