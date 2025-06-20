'use client';

import { addToCart } from '@/lib/cart';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/products';
import Image from 'next/image'; // ✅ import komponentu Image

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return <p className="p-6">Nie znaleziono produktu.</p>;
  }

  const handleAdd = () => {
   addToCart({
  ...product,
  price: Number(product.number)
});

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="relative w-full max-w-md h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded shadow"
        />
      </div>
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-green-600 font-bold text-xl">{product.number} zł</p>
      <button
        onClick={handleAdd}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Dodaj do koszyka
      </button>
    </main>
  );
}}
