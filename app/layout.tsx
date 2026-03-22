import type { Metadata } from "next";
// Adicionamos Pinyon_Script
import { Playfair_Display, Montserrat, Pinyon_Script } from "next/font/google";
import "./globals.css";

// A fonte do espetáculo (para os nomes e o texto desfocado)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600"],
});

// A fonte de suporte (para os rótulos e as pílulas de informação)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

// A nova fonte ornamental (exclusivamente para o e-comercial)
const pinyon = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-script", // Nova variável
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Elias & Janine | 23.05.2026",
  description: "Um convite para celebrar o nosso amor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Injetamos as três variáveis no HTML
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${montserrat.variable} ${pinyon.variable}`}
    >
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
