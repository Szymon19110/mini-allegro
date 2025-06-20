'use client';

import { addToCart } from '@/lib/cart';
import { useRouter } from 'next/navigation';

import { products } from '@/lib/products';


export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return <p className="p-6">Nie znaleziono produktu.</p>;
  }

  const handleAdd = () => {
    addToCart(product);
    router.push('/cart');
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md rounded shadow"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-green-600 font-bold text-xl">{product.price} zł</p>
      <button
        onClick={handleAdd}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Dodaj do koszyka
      </button>
    </main>
  );
}
