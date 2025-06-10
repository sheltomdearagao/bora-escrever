import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/lib/firebase';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bora Escrever - Plataforma Educacional',
  description: 'Sua plataforma de preparação para o ENEM e vestibulares, com IA e tutores.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-200`}>
        <ThemeProvider>
          <ClientErrorBoundary>{children}</ClientErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
