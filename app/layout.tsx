import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 — Bracket Builder & Predictions",
  description:
    "Build your 2026 FIFA World Cup bracket predictions. Rank teams in all 12 groups, track the best 3rd-place teams, and fill out the knockout bracket from Round of 32 to the Final. Export your bracket as PNG or PDF.",
  keywords: [
    "FIFA World Cup 2026",
    "bracket builder",
    "predictions",
    "football",
    "soccer",
    "tournament bracket",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
