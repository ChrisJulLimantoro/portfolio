import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Caveat } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
import { ParallaxBackground } from '@/components/layout/parallaxBackground';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingChatbot } from '@/components/global/floatingChatbot';
import React from 'react';
import { ClientOnly } from '@/components/layout/clientOnly';

export const metadata: Metadata = {
  title: 'Julius Portfolio',
  description:
    'Portfolio of a Full-Stack Developer specializing in AI, microservices, and mobile design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added lang="en" to html tag
    <html lang="en" className={`${spaceGrotesk.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-[#0d1117] text-white">
        <ClientOnly>
          <ParallaxBackground />
        </ClientOnly>

        <Header />

        <main>{children}</main>

        <Footer />

        <FloatingChatbot />
      </body>
    </html>
  );
}
