'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCart } from '@/lib/cart';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };

    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold hover:underline">
        Mini Allegro 🏠
      </Link>
      <Link
        href="/cart"
        className="relative font-semibold bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
      >
        🛒 Koszyk
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}
