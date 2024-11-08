"use client"; // Menandakan bahwa ini adalah komponen sisi klien

import Head from "next/head";
import { useEffect } from 'react';
import "./globals.css";
import { metadata } from './metadata'; // Mengimpor metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <title>Sigma</title>
        <meta name="description" content={metadata.description ?? "Default description"} />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
