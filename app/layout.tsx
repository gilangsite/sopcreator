
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://sop-creator.medtools.id'),
  title: "MEDTOOLS Creator Hub",
  description: "Internal Documentation & SOPs",
  icons: {
    icon: '/favicon.ico?v=2',
    shortcut: '/favicon.ico?v=2',
    apple: '/favicon.ico?v=2',
  },
  openGraph: {
    title: "MEDTOOLS Creator Hub",
    description: "Internal Documentation & SOPs",
    url: 'https://sop-creator.medtools.id',
    siteName: 'MEDTOOLS Creator Hub',
    images: [
      {
        url: '/open-page.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      }
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased flex flex-col min-h-screen bg-[#F8FAFC] text-slate-800 font-sans`}>
        <SmoothScroll />
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


