'use client';

import Link from 'next/link';
import { products } from '@/lib/products';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Mini Allegro 🏠
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="bg-white rounded shadow hover:shadow-lg transition block p-4"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-green-600 font-bold">{product.price} zł</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
