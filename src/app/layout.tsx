import './globals.css';
import type { Metadata } from 'next';
import Header from './header';


export const metadata: Metadata = {
  title: 'Mini Allegro',
  description: 'Projekt w Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-white text-black">
        <Header />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
