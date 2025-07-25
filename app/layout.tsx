import './globals.css';
import { Toaster } from '@/components/Toaster';
import { Inter, Nunito } from 'next/font/google';
import type React from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata = {
  title: 'Nederlands Leren - Interactive Dutch Learning Platform',
  description:
    'Learn Dutch with interactive exercises, vocabulary cards, and grammar lessons. Master the Dutch language with our comprehensive learning platform.',
  keywords:
    'Dutch learning, Netherlands language, Dutch vocabulary, Dutch grammar, language learning',
  authors: [{ name: 'Nederlands Leren Team' }],
  creator: 'Nederlands Leren',
  publisher: 'Nederlands Leren',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#003d82' },
    { media: '(prefers-color-scheme: dark)', color: '#1a5db8' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
