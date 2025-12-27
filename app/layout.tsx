import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "NyariGamis 💕",
  description: "Temukan Outfit Syar'i terbaik dengan sistem rekomendasi cerdas.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Deteksi URL halaman (biar bisa bedain login dengan halaman lain)
  const isLoginPage =
    typeof window !== "undefined" && window.location.pathname.startsWith("/login");

  return (
    <html lang="en">
      <body
        className={`
          font-sans ${GeistSans.variable} ${GeistMono.variable}
          ${isLoginPage
            ? "bg-gradient-to-br from-[#FADADD] via-[#E8B4B8] to-white flex items-center justify-center min-h-screen"
            : "bg-gradient-to-br from-[#FADADD] via-[#E8B4B8] to-white text-[#4A2C2A] min-h-screen"}
        `}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
