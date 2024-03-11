import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/providers/next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PIOKI",
  description: "You pass it along or keep it alone?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
