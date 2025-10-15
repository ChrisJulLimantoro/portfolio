import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { AppWrapper } from './appWrapper'; // We'll use a client component wrapper

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CJ - Portfolio',
  description: 'Software & AI Engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AppWrapper is a client component that will manage state and contain other client components */}
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
