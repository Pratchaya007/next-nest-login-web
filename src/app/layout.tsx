import "@/style/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { notoSans } from "@/style/font";
import { Metadata } from "next";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    template: '%s - Ecom',
    default: 'Ecom'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`antialiased ${notoSans.className}`}>{children}</body>
    </html>
  );
}
