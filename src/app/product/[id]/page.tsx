'use client';

import { addToCart } from '@/lib/cart';
import { useRouter, useParams } from 'next/navigation';
import { products } from '@/lib/products';
import Image from 'next/image';

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p className="p-6">Nie znaleziono produktu.</p>;
  }

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
    });
    router.push('/cart');
  };

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
