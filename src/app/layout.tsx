import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/providers/next-auth";
import NextTopLoader from 'nextjs-toploader';
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '(PIOKI) - 💛',
  description: 'Have fun socializing yourself up with the fascinating system . . .',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <NextTopLoader showSpinner={false} color="#9c08ff" />
          {children}
          </body>
      </SessionProvider>
    </html>
  );
}
