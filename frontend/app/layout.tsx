import type { Metadata } from 'next';
import { MonteCarlo, Gayathri,Parisienne } from 'next/font/google';
import './globals.css';

const monteCarlo = MonteCarlo({
  variable: '--font-cursiva',
  subsets: ['latin'],
  weight: '400',
});

const gayathri = Gayathri({
  variable: '--font-principal',
  subsets: ['latin'],
  weight: ['100', '400', '700'],
});

const parisienne = Parisienne ({
  variable: '--font-cursiva-secundario',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Boda José & Daiana',
  description: 'Invitación de boda — 14 de Noviembre, Puebla',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${monteCarlo.variable} ${gayathri.variable} ${parisienne.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
