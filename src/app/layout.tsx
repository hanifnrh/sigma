import { DataAyamProvider } from '@/components/DataAyamContext';
import { NotificationProvider } from '@/components/NotificationContext';
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { StatsProvider } from '@/components/StatsContext';
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
        <NotificationProvider>
          <ServiceWorkerRegister></ServiceWorkerRegister>
          <StatsProvider>
            <DataAyamProvider>
                {children}
            </DataAyamProvider>
          </StatsProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
