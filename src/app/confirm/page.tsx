'use client';

export default function ConfirmPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Zamówienie złożone!
      </h1>
      <p className="text-lg text-gray-700 text-center">
        Dziękujemy za zakupy w Mini Allegro. Otrzymasz potwierdzenie na e-mail.
      </p>
    </main>
  );
}
