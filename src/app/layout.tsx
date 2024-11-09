import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sigma",
  description: "Sistem IoT Terintegrasi Monitoring Kandang Ayam",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ServiceWorkerRegister></ServiceWorkerRegister>
        {children}
      </body>
    </html>
  );
}
