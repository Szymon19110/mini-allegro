'use client';

import Link from 'next/link';
import { useState } from 'react';
import { addToCart } from '@/lib/cart';
import { products } from '@/lib/products';

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Pole wyszukiwania */}
      <input
        type="text"
        placeholder="Szukaj produktu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />

      {/* Lista produktów */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <Link href={`/product/${product.id}`}>
              <div className="cursor-pointer text-black">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-green-600 font-bold">{product.price} zł</p>
              </div>
            </Link>

            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Dodaj do koszyka
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
