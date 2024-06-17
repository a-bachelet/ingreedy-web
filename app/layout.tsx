import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import IngreedyNav from "@/components/ingreedy-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ingreedy",
  description: "Ingreedy app website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="fr">
        <body className={inter.className}>
          <IngreedyNav />
          {children}
        </body>
      </html>
    </Providers>
  );
}
