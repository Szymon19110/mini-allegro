'use client';

import { getCart, removeFromCart, addToCart, CartItem } from '@/lib/cart';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false); // 🔑 ważne

  useEffect(() => {
    setIsMounted(true);

    const loadCart = () => {
      const cartData = getCart();
      setCart(cartData);
    };

    loadCart();

    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  if (!isMounted) {
    return null; // opcjonalnie: spinner / tekst "Ładowanie..."
  }

  const handleRemove = (id: number | string): void => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleIncrease = (product: CartItem): void => {
    addToCart(product);
    setCart(getCart());
  };

  const handleDecrease = (id: number | string): void => {
    const current: CartItem[] = getCart();
    const updated: CartItem[] = current.map((item: CartItem) =>
      item.id === id
        ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
        : item
    );
    localStorage.setItem('cart', JSON.stringify(updated));
    setCart(updated);
  };

  const total = cart.reduce(
    (sum: number, item: CartItem) =>
      sum + (item.quantity || 1) * Number(item.price),
    0
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Link
        href="/"
        className="text-3xl font-bold mb-6 block text-center text-blue-600 hover:underline"
      >
        Mini Allegro 🏠
      </Link>

      <h1 className="text-2xl font-semibold mb-4 text-center">🛒 Twój koszyk</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Koszyk jest pusty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item: CartItem) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-green-600 font-bold">
                  {item.price} zł × {item.quantity || 1}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  −
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  onClick={() => handleIncrease(item)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Suma: {total} zł
          </div>

          <div className="text-right mt-4">
            <a
              href="/confirm"
              onClick={() => {
                localStorage.removeItem('cart');
                setCart([]);
              }}
              className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Zamów
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
