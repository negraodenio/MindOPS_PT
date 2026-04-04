import "./globals.css";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AEGIS HUB // Intelligence Ocupacional",
  description: "A plataforma líder para diagnóstico psicossocial e intervenção assistida por IA (M2.7) no contexto da AEGIS HUB.",
  manifest: "/manifest.json",
};

import { SOSChatWidget } from "../features/sos/components/SOSChatWidget";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={`${inter.variable}`}>
      <body className="antialiased selection:bg-brand selection:text-white">
        {children}
        <SOSChatWidget />
      </body>
    </html>
  );
}
