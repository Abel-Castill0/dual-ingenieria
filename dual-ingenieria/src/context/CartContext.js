"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();
const STORAGE_KEY = "dual-cart";

export function CartProvider({ children }) {
  // Siempre inicia [] — el servidor renderiza carrito vacío y el cliente
  // hidrata idéntico; localStorage se lee recién en el effect post-montaje,
  // evitando el mismatch "Text content did not match server-rendered HTML".
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setCart(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Persistir solo después del primer montaje: si corriera antes,
    // el [] inicial del SSR pisaría el carrito guardado.
    if (isMounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isMounted]);

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
    const lines = cart.map((i) => `• ${i.qty}x ${i.name}`);
    const msg =
      `Hola equipo de Dual Ingeniería. Me interesa cotizar los siguientes requerimientos:\n\n` +
      `${lines.join("\n")}\n\n` +
      `Quedo atento a su respuesta.`;
    window.open(
      `https://wa.me/51973042657?text=${encodeURIComponent(msg)}`,
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
