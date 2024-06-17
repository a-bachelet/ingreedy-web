import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import IngreedyNav from "@/components/ingreedy-nav";
import { Card } from "@material-tailwind/react";
import IngreedyContent from "@/components/ingreedy-content";

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
      <html lang="fr" className="w-full h-full">
        <body className={`${inter.className} w-full h-full`}>
          <div className="w-full h-full">
            <IngreedyNav />
            <IngreedyContent>
              {children}
            </IngreedyContent>
          </div>
        </body>
      </html>
    </Providers>
  );
}
