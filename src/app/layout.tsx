import "@/style/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { notoSans } from "@/style/font";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/darkmode/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s - Ecom",
    default: "Ecom",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <head />
      <body className={`antialiased ${notoSans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
