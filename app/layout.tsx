import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maison Lumiere Spa | Luxury Beauty & Wellness",
  description:
    "A premium beauty and wellness destination for advanced facials, body rituals, massage therapy, memberships, products, and online booking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
